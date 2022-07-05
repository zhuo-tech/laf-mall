import { SysAdminApi } from '@/repository/SysAdminApi'
import { CrudRequest } from '@/service/CrudRequest'
import { useUserStore } from '@/store/user'
import { Component, Inject, LogicDelete, SysRole, SysUser } from 'common'
import { LafClient, Page, QueryChainWrapper } from 'laf-db-query-wrapper'
import { CollUtil } from 'typescript-util'

export type SysUserInfo = SysUser & { password: string, roleInfo: Array<Partial<SysRole>> }

/**
 * SysUserRepository
 * @author 冰凝
 * @date 2022-06-15 下午 12:23
 **/
@Component(SysUserRepository.KEY)
export class SysUserRepository implements CrudRequest<SysUserInfo> {
    public static readonly KEY = 'SysUserRepository'

    private readonly client = new LafClient<SysUserInfo>(SysUser.NAME)
    private readonly userStore = useUserStore()

    @Inject(SysAdminApi.KEY)
    private get adminApi(): SysAdminApi {
        return null as any
    }

    public createRequest = async (data: Partial<SysUserInfo>): Promise<any> => {
        return await this.adminApi.createUser(data as any)
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {
        return await this.client.updateById(id, {isDelete: LogicDelete.DELETED})
    }

    public pageRequest = async (page: Page<SysUserInfo>, query: Partial<SysUserInfo>): Promise<Page<SysUserInfo>> => {
        const userInfoPage = await this.client.queryWrapper()
            .likeNotEmpty('username', query?.username)
            .likeNotEmpty('nickname', query?.nickname)
            .eqNotNull('isAdmin', query?.isAdmin)
            .eq('isDelete', LogicDelete.NORMAL)
            .eqNotNull('freeze', query?.freeze)
            .inNotEmpty('role', query?.role)
            .page(page)

        if (CollUtil.isEmpty(userInfoPage.list)) {
            return userInfoPage
        }
        const roleKeys = userInfoPage.list.flatMap(i => i.role)
        const roleList = await new QueryChainWrapper<SysRole>(SysRole.NAME)
            .inNotEmpty('key', CollUtil.distinct(roleKeys))
            .show('key', 'name', 'permissions')
            .list(9999)

        userInfoPage.list.forEach(user => user.roleInfo = roleList.filter(role => user.role.includes(role.key)))

        return userInfoPage
    }

    public updateRequest = async (data: Partial<SysUserInfo>): Promise<any> => {
        data.updateTime = Date.now()
        data.updateBy = this.userStore._id
        return await this.client.updateById(data._id!, data, '_id')
    }

}
