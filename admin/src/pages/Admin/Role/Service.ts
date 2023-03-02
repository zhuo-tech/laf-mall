import { SysPermissionRepository } from '@/repository/SysPermissionRepository'
import { SysRoleRepository, SysRoleRow } from '@/repository/SysRoleRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { SelectOption, SysRole } from 'common'
import { Ref, ref } from 'vue'

/**
 * User
 * @author 冰凝
 * @date 2022-06-14 下午 06:06
 **/
export class RoleService extends BasisCrud<SysRoleRow> {
    /**
     * 所有的权限信息 选择项
     */
    public perSelectOption: Ref<Array<SelectOption>> = ref([])
    public override formRule: Partial<Record<keyof SysRole, Array<RuleItem>>> = {
        key: [ { type: 'string', required: true, message: '必填' } ],
        name: [ { type: 'string', required: true, message: '必填' } ],
        desc: [ { type: 'string', required: true, message: '必填' } ],
        permissions: [ { type: 'array', required: true, message: '请选择' } ],
    }
    private repository: SysRoleRepository = new SysRoleRepository()
    protected override readonly request: CrudRequest<SysRoleRow> = this.repository
    private readonly permissionRepository: SysPermissionRepository = new SysPermissionRepository()

    constructor() {
        super()
        this.permissionRepository.selectOptions()
            .then(list => this.perSelectOption.value = list)
    }

    protected override get formDataDefault(): Partial<SysRole> {
        return new SysRole()
    }

}
