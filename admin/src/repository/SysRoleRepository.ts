import { CrudRequest } from '@/service/CrudRequest'
import { Component, SelectOption, SysPermission, SysRole } from 'common'
import { LafClient, Page, QueryChainWrapper } from 'laf-db-query-wrapper'
import { CollUtil } from 'typescript-util'

export type SysRoleRow = SysRole & { per: Array<Pick<SysPermission, 'name' | 'desc'>> }

/**
 * SysRoleRepository
 * @author 冰凝
 * @date 2022-06-15 下午 03:21
 **/
@Component(SysRoleRepository.KEY)
export class SysRoleRepository implements CrudRequest<SysRoleRow> {
    public static readonly KEY = 'SysRoleRepository'

    private readonly client = new LafClient<SysRoleRow>(SysRole.NAME)

    public createRequest = async (data: Partial<SysRoleRow>): Promise<any> => {
        data.createTime = Date.now()
        data.createBy = '2333333'
        data.updateTime = Date.now()
        return await this.client.insert(data)
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {
        return await this.client.deleteById(id)
    }

    public pageRequest = async (page: Page<SysRoleRow>, query: Partial<SysRoleRow>): Promise<Page<SysRoleRow>> => {
        const sysRolePage = await this.client.queryWrapper()
            .likeNotEmpty('key', query.key)
            .likeNotEmpty('name', query.name)
            .likeNotEmpty('desc', query.desc)
            .hide('createBy', 'updateBy')
            .page(page)

        if (CollUtil.isEmpty(sysRolePage.list)) {
            return sysRolePage
        }

        const perKeys = sysRolePage.list.flatMap(i => i.permissions)
        const permissions = await new QueryChainWrapper<SysPermission>(SysPermission.NAME)
            .inNotEmpty('name', CollUtil.distinct(perKeys))
            .show('name', 'desc')
            .list(9999)
        sysRolePage.list.forEach(role => role.per = permissions.filter(per => role.permissions.includes(per.name)))

        return sysRolePage
    }

    public updateRequest = async (data: Partial<SysRoleRow>): Promise<any> => {
        data.updateTime = Date.now()
        data.updateBy = '23333333'
        return await this.client.updateById(data._id!, data, '_id')
    }

    public async selectOptions(): Promise<Array<SelectOption>> {
        const roles = await this.client.queryWrapper()
            .show('key', 'name')
            .orderByAsc('key')
            .list(9999)

        return roles.map(({key, name}) => ({label: name, value: key}))
    }

}
