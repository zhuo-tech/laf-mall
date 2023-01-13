import { BasicRouterControl } from '@/pages/Basic/Router'
import { BasicCategoryRepository, ProductCategoryTreeNode } from '@/repository/BasicCategoryRepository'
import { BasicProductRepository } from '@/repository/BasicProductRepository'
import { BasicSpecProductRepository } from '@/repository/BasicSpecProductRepository'
import { MallConfigRepository } from '@/repository/MallConfigRepository'
import { computed } from '@vue/runtime-core'
import { RuleItem } from 'async-validator'
import { BasicProduct, BasicSpecProduct, Entity, HomePageChannel, Inject, ProductTag, SpecType } from 'common'
import { ElMessage, FormInstance } from 'element-plus'
import { onActivated, reactive, ref, Ref } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export class EditorService {
    public formData: Partial<BasicProduct> = reactive(this.formDataDefault as any)
    public specData = ref<Partial<BasicSpecProduct>>({})
    public formIsLoading: Ref<boolean> = ref(false)
    public formRule: Partial<Record<keyof BasicProduct, Array<RuleItem>>> = {
        name: [{type: 'string', message: '必填', required: true}],
        cover: [{type: 'string', message: '请选择文件上传', required: true}],
    }
    /**
     * 商品分类 树形数据
     */
    public categoryOption = ref<Array<ProductCategoryTreeNode>>([])
    public channelList = ref<Array<HomePageChannel & Entity>>([])
    /**
     * 二级栏目
     */
    public channelValueList = computed(() => {
        return this.channelList.value.filter((item: HomePageChannel & Entity) => item._id === this.formData.channelId)[0]?.children
    })
    private formRef: Ref<FormInstance | undefined> = ref<FormInstance>()
    private readonly route: RouteLocationNormalizedLoaded
    /**
     * 当前页面 商品ID
     */
    private productId = computed(() => <string>this.route.params['id'])
    /**
     * 是编辑?
     */
    private isEdit = computed(() => !!this.productId.value)

    constructor(route: RouteLocationNormalizedLoaded) {
        this.route = route

        this.categoryRepository.categoryTree()
            .then(list => this.categoryOption.value = list)

        this.mallConfigRepository.productChannel()
            .then(list => this.channelList.value = list)

        onActivated(() => this.formDateInit())
    }

    /**
     * 表单提交
     */
    public formSubmit = () => {
        const asyncSave = async () => {
            let productId = this.formData._id
            if (this.isEdit.value) {
                await this.productRepository.updateRequest(this.formData)
            } else {
                productId = await this.productRepository.createRequest(this.formData)
            }

            if (this.specData.value._id) {
                await this.specProductRepository.updateRequest(this.specData.value)
            } else {
                this.specData.value.productId = productId!
                await this.specProductRepository.createRequest(this.specData.value)
            }

            ElMessage.success(this.isEdit ? '编辑成功' : '添加成功')
            BasicRouterControl.toProduct()
            this.formIsLoading.value = true
        }
        asyncSave().catch(err => {
                console.log('保存失败', err)
                ElMessage.error(err?.message)
            })
            .finally(() => this.formIsLoading.value = false)
    }

    /**
     * 表单默认值
     * @protected
     */
    protected get formDataDefault(): Partial<BasicProduct> {
        return Object.assign(new BasicProduct(), {
            sort: 1,
            status: true,
            tags: [] as ProductTag[],
            specType: SpecType.SingleSpec,
        } as Partial<BasicProduct>)
    }

    @Inject(BasicCategoryRepository.KEY)
    private get categoryRepository(): BasicCategoryRepository {
        return null as any
    }

    @Inject(BasicProductRepository.KEY)
    private get productRepository(): BasicProductRepository {
        return null as any
    }

    @Inject(MallConfigRepository.KEY)
    private get mallConfigRepository(): MallConfigRepository {
        return null as any
    }

    @Inject(BasicSpecProductRepository.KEY)
    private get specProductRepository(): BasicSpecProductRepository {
        return null as any
    }

    /**
     * 编辑页面初始化数据
     */
    private formDateInit = () => {
        if (this.isEdit.value) {
            this.productRepository.detail(this.productId.value)
                .then(productDetail => {
                    if (!productDetail) {
                        ElMessage.error('商品ID无效: ' + this.productId.value)
                        return
                    }
                    if (productDetail.specType === SpecType.SingleSpec) {
                        console.log('商品详情', productDetail)
                        this.specData.value = productDetail?.specArr[0]!
                    }
                    Object.assign(this.formData, productDetail)
                })
        } else {
            this.specData.value = new BasicSpecProduct()
            Object.assign(this.formData, this.formDataDefault)
        }
    }

    public changeChannel = () => {
        this.formData.channelValue = ''
    }

    public setFormRef = (ref: any) => {
        if (ref) {
            this.formRef.value = ref
        }
    }
}
