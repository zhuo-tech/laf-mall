import { SysPermissionRepository } from '@/repository/SysPermissionRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { ObjectTool } from '@es-tool/core'
import { computed } from '@vue/runtime-core'
import { RuleItem } from 'async-validator'
import { BasicProduct, BasicProductCategory, KeyValue, MallConfig, MallOrder, MallRechargeRecord, MallShopCart, SysPermission, SysRole, SysUser } from 'common'
import { reactive, ref } from 'vue'

// 预设权限表名称
export const defaultPermissionsTableName: Array<KeyValue> = [
    new KeyValue('系统用户', SysUser.NAME),
    new KeyValue('系统角色', SysRole.NAME),
    new KeyValue('系统权限', SysPermission.NAME),
    new KeyValue('商品', BasicProduct.NAME),
    new KeyValue('商品分类', BasicProductCategory.NAME),
    new KeyValue('配置', MallConfig.NAME),
    new KeyValue('订单', MallOrder.NAME),
    new KeyValue('充值记录', MallRechargeRecord.NAME),
    new KeyValue('购物车', MallShopCart.NAME),
]
// 预设动作
export const defaultAction: Array<KeyValue> = [
    new KeyValue('创建', 'create'), new KeyValue('更新', 'update'),
    new KeyValue('查询', 'read'), new KeyValue('删除', 'delete'),
]

export type PermissionLine = {
    tableName: KeyValue,
    create: KeyValue
    update: KeyValue
    read: KeyValue
    delete: KeyValue
}

/**
 * User
 * @author 冰凝
 * @date 2022-06-14 下午 06:06
 **/
export class PermissionService extends BasisCrud<SysPermission> {
    public override formRule: Partial<Record<keyof SysRole, Array<RuleItem>>> = {
        name: [ { type: 'string', required: true, message: '必填' } ],
        desc: [ { type: 'string', required: true, message: '必填' } ],
    }
    /**
     * 批量选择时的值:
     * - key: 权限key {@link SysPermission.name} {@link defineKey}
     * - value: 权限描述 {@link SysPermission.desc} {@link defineValue}
     */
    public batchSelection = reactive<Record<string, string>>({})
    /**
     * 每一行的全选按钮
     * - key: 表名
     * - value: checkbox 选中状态
     */
    public selectAllButton = reactive<Record<string, boolean>>({})
    public bulkSaveIsLoading = ref(false)
    /**
     * 默认权限
     */
    public defaultPermissions = computed<Array<PermissionLine>>(() => {
        return defaultPermissionsTableName.map(tableKv => {
            const o = defaultAction.reduce((pv, actionKv) => {
                pv[actionKv.value] = new KeyValue(defineKey(actionKv, tableKv), defineValue(tableKv, actionKv))
                return pv
            }, {} as PermissionLine)
            o.tableName = tableKv
            return o
        })
    })
    private readonly repository: SysPermissionRepository = new SysPermissionRepository()
    protected override readonly request: CrudRequest<SysPermission> = this.repository
    private oldSelectKey: Array<string> = []

    protected override get formDataDefault(): Partial<SysPermission> {
        return new SysPermission()
    }

    public override show: () => void = () => {
        this.isShow.value = true
        this.batchSelectionInit()
    }

    public lineChange = (tableKv: KeyValue, isSelect: boolean) => {
        for (const actionKv of defaultAction) {
            this.batchSelection[defineValue(tableKv, actionKv)] = isSelect ? defineKey(actionKv, tableKv) : ''
        }
    }

    public bulkSave = () => {
        const asyncOperation = async () => {
            const toArray = ObjectTool.toArray(this.batchSelection)
            // value 有值, 例如: sys_user_create: '创建系统用户'; 无值的是取消勾选
            const newCreates = toArray.filter(kv => kv.value && !this.oldSelectKey.includes(kv.key))
                .map(kv => ({ name: kv.key, desc: kv.value }))
            await this.repository.bulkSave(newCreates)

            // value 为空, 可能是要删除; 同时 oldSelect 存在, 那一定是需要删除
            const needToDelete = toArray.filter(kv => !kv.value && this.oldSelectKey.includes(kv.key))
                .flatMap(i => i.key)
            await this.repository.deleteByKey(...needToDelete)
        }

        console.debug('批量保存')
        this.bulkSaveIsLoading.value = true
        asyncOperation()
            .then(() => {
                this.close()
                this.listUpdate()
            })
            .catch(err => console.debug('批量操作失败: ', err))
            .finally(() => this.bulkSaveIsLoading.value = false)
    }

    /**
     * 批量选择 初始化
     */
    private batchSelectionInit() {
        this.bulkSaveIsLoading.value = true
        this.repository.selectOptions()
            .then(list => {
                this.oldSelectKey = list.flatMap(i => i.value)
                for (const option of list) {
                    this.batchSelection[option.value] = option.label
                }

                for (let tableKv of defaultPermissionsTableName) {
                    this.selectAllButton[tableKv.value] = defaultAction
                        .map((kv) => defineValue(tableKv, kv))
                        .every(perKey => this.oldSelectKey.includes(perKey))
                }
            })
            .finally(() => this.bulkSaveIsLoading.value = false)
    }
}

function defineValue(tableKv: KeyValue<string, string>, actionKv: KeyValue<string, string>) {
    return tableKv.value + '_' + actionKv.value
}

function defineKey(actionKv: KeyValue<string, string>, tableKv: KeyValue<string, string>) {
    return actionKv.key + tableKv.key
}
