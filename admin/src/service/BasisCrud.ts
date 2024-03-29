import { CrudRequest } from '@/service/CrudRequest'
import { ObjectTool } from '@es-tool/core'
import { RuleItem } from 'async-validator'
import { ElMessage, FormInstance } from 'element-plus'
import { Page } from 'laf-db-query-wrapper'
import { reactive, Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * 通用 CRUD 管理页面 <br>
 * 标记为 {@code protected} 权限的成员, 建议实现类覆盖 <br>
 * @param E 当前模型对象, 对应表格中一行 / 编辑表单 / 搜索表单数据
 */
export default abstract class BasisCrud<E> {
    /**
     * 当前页的路由匹配路径, 可选的用于面包屑展示
     */
    public readonly matchedRoute = useRoute().matched
    /**
     * 表格行的key, 应该是 E 中的ID属性名, 默认 _id
     * @type {string}
     */
    public readonly rowKey: string = '_id'
    /**
     * 搜索表单地显隐状态
     */
    public showQuery: Ref<boolean> = ref(false)
    /**
     * 搜索表单数据
     */
    public queryData: Partial<E> = reactive({})
    /**
     * 分页参数和表格中的数据
     * @see Page
     * @see Page.list
     */
        // @ts-ignore
    public page: Page<E> = reactive(new Page<E>())
    /**
     * 表格加载中
     */
    public tableIsLoading: Ref<boolean> = ref(false)
    /**
     * 新增/编辑表单是否展示
     */
    public isShow: Ref<boolean> = ref(false)
    /**
     * 新增/编辑表单 表单值
     */
    public formData: Partial<E> = reactive(this.formDataDefault as any)
    /**
     * 新增/编辑表单, 表单状态, 是新增表单?
     */
    public formIsAdd: Ref<boolean> = ref(false)
    /**
     * 表单提交中 ...
     */
    public formIsLoading: Ref<boolean> = ref(false)
    /**
     * 表单验证规则
     * @type {Partial<Record<keyof E, Array<RuleItem>>>}
     */
    public formRule: Partial<Record<keyof E, Array<RuleItem>>> = {}
    protected readonly request: CrudRequest<E>
    private formRef: Ref<FormInstance | undefined> = ref<FormInstance>()
    private basisLog = console

    constructor() {
        watch(() => this.page.pageSize, this.listUpdate, { deep: true })
        watch(() => this.page.currentPage, this.listUpdate, { deep: true })
    }

    /**
     * 表单默认值
     */
    protected get formDataDefault(): Partial<E> {
        return {}
    }

    public setFormRef = (ref: any) => {
        if (ref) {
            this.formRef.value = ref
        }
    }

    /**
     * 加载/刷新 表格数据
     */
    public listUpdate = () => {
        this.tableIsLoading.value = true
        this.request.pageRequest(this.page as any, this.queryData as any)
            .then(page => {
                this.page.total = page.total
                this.page.list = page.list
            })
            .catch(err => {
                this.basisLog.debug(err)
                ElMessage.error(err?.message)
            })
            .finally(() => this.tableIsLoading.value = false)
    }

    /**
     * 搜索表单提交, 默认仅阻止空查询
     */
    public queryFormSubmit = () => {
        if (!this.queryData || Object.keys(this.queryData).length <= 0) {
            this.basisLog.debug('搜索选项为空...')
            return
        }
        this.listUpdate()
    }

    /**
     * 表单提交按钮回调事件
     * - 调用提交接口方法 {@link createRequest} 或 {@link updateRequest}
     * - 处理表单加载状态
     * - 重置表单默认值
     */
    public formSubmit = () => {
        let submitData = this.beforeSubmit(this.formData)
        this.basisLog.debug('表单提交: ', this.formIsAdd.value ? '新增' : '编辑', submitData)

        const submitAction = async () => {
            const valid = await this.formRef?.value?.validate()
                .catch((err: Record<string, Array<any>>) => {
                    ObjectTool.toArray(err).flatMap(i => i.value)
                        .forEach(i => this.basisLog.warn('验证失败', i))
                })
            this.basisLog.debug('验证结果:', valid)
            if (!valid) {
                return
            }

            // noinspection JSUnusedLocalSymbols
            const res = await (this.formIsAdd.value ? this.request.createRequest : this.request.updateRequest)(submitData)
            this.basisLog.debug('表单提交完成')
            this.close()
            this.listUpdate()

            this.resetForm()
        }

        this.formIsLoading.value = true
        submitAction()
            .catch(err => {
                this.basisLog.warn('表单提交错误', err)
                ElMessage.warning('表单提交错误: ' + err?.message ?? '')
            })
            .finally(() => this.formIsLoading.value = false)
    }

    /**
     * 新增按钮回调事件
     */
    public readyAdd = () => {
        this.resetForm()
        this.formIsAdd.value = true
        this.show()
    }

    /**
     * 编辑按钮回调事件, 需要传入当前行的数据
     * @param {E} data 一行数据
     */
    public readyEdit = (data: E) => {
        this.formData = Object.assign(this.formData, ObjectTool.copy(data))
        this.formIsAdd.value = false
        this.show()
    }

    /**
     * 删除按钮回调事件, 需要传入当前行的数据
     * @param {E} data 一行数据
     */
    public readyDelete = (data: E) => {
        this.request.deleteByIdRequest(data[this.rowKey])
            .then(() => {
                this.basisLog.debug('删除完成')
                this.listUpdate()
            })
            .catch(err => this.basisLog.error('删除失败', err))
    }

    /**
     * 打开表单
     */
    public show = () => {
        this.isShow.value = true
    }

    /**
     * 关闭表单
     */
    public close = () => {
        this.isShow.value = false
    }

    /**
     * 新增/编辑 表单 提交之前的预处理
     * @param {Partial<E>} formData 表单数据
     * @return {Partial<E>} 处理后的表单数据, 原样传递给 {@link createRequest} 或 {@link updateRequest}
     * @protected
     */
    protected beforeSubmit(formData: Partial<E>): Partial<E> {
        // 提交之前预处理
        return formData
    }

    private resetForm = () => this.formData = Object.assign(this.formData, this.formDataDefault)
}
