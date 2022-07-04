import { CrudRequest } from '@/service/CrudRequest'
import { useUserStore } from '@/store/user'
import { Component, SelectOption, SysPermission } from 'common'
import { LafClient, Page } from 'laf-db-query-wrapper'
import { CollUtil } from 'typescript-util'

/**
 * SysPermissionRepository
 * @author 冰凝
 * @date 2022-06-15 下午 03:32
 **/
@Component(SysPermissionRepository.KEY)
export class SysPermissionRepository implements CrudRequest<SysPermission> {
    public static readonly KEY = 'SysPermissionRepository'

    private readonly client = new LafClient<SysPermission>(SysPermission.NAME)
    private readonly userStore = useUserStore()

    public createRequest = async (data: Partial<SysPermission>): Promise<any> => {
        data.createTime = Date.now()
        data.createBy = this.userStore._id
        data.updateTime = Date.now()
        return await this.client.insert(data)
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {
        return await this.client.deleteById(id)
    }

    public pageRequest = async (page: Page<SysPermission>, query: Partial<SysPermission>): Promise<Page<SysPermission>> => {
        return await this.client.queryWrapper()
            .likeNotEmpty('name', query.name)
            .likeNotEmpty('desc', query.desc)
            .orderByAsc('name')
            .page(page)
    }

    public updateRequest = async (data: Partial<SysPermission>): Promise<any> => {
        data.updateTime = Date.now()
        data.updateBy = this.userStore._id
        return await this.client.updateById(data._id!, data, '_id')
    }

    /**
     * 根据权限标识 {@link SysPermission.name} 删除
     * @param key
     */
    public async deleteByKey(...key: Array<string>) {
        if (CollUtil.isEmpty(key)) {
            return
        }

        // 一般没有批量权限, 没办法
        for (let i of key) {
            await this.client.queryWrapper().where({name: i}).delete()
        }

        // await this.client.queryWrapper()
        //     .where({name: new RegExp(key.join('|'))})
        //     .delete(key.length > 1)
    }

    /**
     * 批量保存
     * @param dataArr 属性可选, 至少和 {@link createRequest} 一样表单必填属性不能少
     */
    public async bulkSave(dataArr: Array<Partial<SysPermission>>) {
        for (let data of dataArr) {
            await this.createRequest(data)
        }
    }

    public async selectOptions(): Promise<Array<SelectOption>> {
        const roles = await this.client.queryWrapper()
            .show('name', 'desc')
            .orderByAsc('name')
            .list(9999)

        return roles.map(({desc, name}) => ({label: desc, value: name}))
    }

}
