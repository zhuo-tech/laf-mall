import { CrudRequest } from '@/service/CrudRequest'
import { useUserStore } from '@/store/user'
import { Component, Entity, HomePageChannel, MallConfig, MallConfigKey } from 'common'
import { LafClient, Page } from 'laf-db-query-wrapper'
import { ArrayTool } from '@es-tool/core'

/**
 * MallConfigRepository
 * @author 冰凝
 * @date 2022-06-20 下午 05:33
 **/
@Component(MallConfigRepository.KEY)
export class MallConfigRepository implements CrudRequest<MallConfig> {
    public static readonly KEY = 'MallConfigRepository'
    private readonly client = new LafClient<MallConfig>(MallConfig.NAME)
    private readonly userStore = useUserStore()

    public createRequest = async (data: Partial<MallConfig>): Promise<any> => {
        const now = Date.now()
        data.createTime = now
        data.updateTime = now
        data.createBy = this.userStore._id
        data.updateBy = this.userStore._id

        return await this.client.insert(data)
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {
        return await this.client.deleteById(id)
    }

    public pageRequest = async (page: Page<MallConfig>, query: Partial<MallConfig>): Promise<Page<MallConfig>> => {
        return await this.client.queryWrapper()
            .eq('key', query?.key!)
            .page(page)
    }

    public updateRequest = async (data: Partial<MallConfig>): Promise<any> => {
        data.updateTime = Date.now()
        data.updateBy = this.userStore._id
        return await this.client.updateById(data._id!, data, '_id')
    }

    /**
     * @see MallConfigKey.HOMEPAGE_CHANNEL
     */
    public productChannel = async (): Promise<Array<HomePageChannel & Entity>> => {
        const list = await this.client.queryWrapper()
            .eq('key', MallConfigKey.HOMEPAGE_CHANNEL)
            .show('_id', 'value')
            .list(10000)

        if (ArrayTool.isEmpty(list)) {
            return []
        }

        return list.map(({_id, value}) => (<HomePageChannel & Entity>{...value, _id}))
    }

}
