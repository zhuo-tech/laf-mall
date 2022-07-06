import { SysAdminRepository, SysUserInfo } from '@/repository/SysAdminRepository'
import { SysRoleRepository } from '@/repository/SysRoleRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { Inject, SelectOption, SysAdmin } from 'common'
import { Ref, ref } from 'vue'

/**
 * User
 * @author 冰凝
 * @date 2022-06-14 下午 06:06
 **/
export class UserService extends BasisCrud<SysUserInfo> {
    public roleSelectOption: Ref<Array<SelectOption>> = ref([])

    protected readonly request: CrudRequest<SysUserInfo> = this.repository

    constructor() {
        super()
        this.roleRepository.selectOptions().then(list => this.roleSelectOption.value = list)
    }

    @Inject(SysAdminRepository.KEY)
    public get repository(): SysAdminRepository {
        return null as any
    }

    @Inject(SysRoleRepository.KEY)
    public get roleRepository(): SysRoleRepository {
        return null as any
    }

    protected get formDataDefault(): Partial<SysUserInfo> {
        return Object.assign(new SysAdmin(), {
            isAdmin: true,
            freeze: false,
            role: [],
            password: '',
        })
    }

    public formRule: Partial<Record<keyof SysUserInfo, Array<RuleItem>>> = {
        avatar: [{type: 'string', message: '请选择文件上传', required: false}],
        username: [{type: 'string', message: '必填', required: true}],
        nickname: [{type: 'string', message: '必填', required: true}],
        freeze: [{type: 'boolean', message: '必填', required: true}],
        password: [{type: 'string', message: '必填', required: true}],
        role: [{type: 'array', message: '请选择', required: true}],
    }

}
