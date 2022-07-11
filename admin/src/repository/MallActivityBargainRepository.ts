import { CrudRequest } from '@/service/CrudRequest'
import { useUserStore } from '@/store/user'
import { Component, LogicDelete, MallActivityBargain } from 'common'
import { LafClient, Page } from 'laf-db-query-wrapper'

/**
 * MallActivityBargainRepository
 * @author 冰凝
 * @date 2022-07-11 10:50:00
 **/
@Component(MallActivityBargainRepository.KEY)
export class MallActivityBargainRepository implements CrudRequest<MallActivityBargain> {
    public static readonly KEY = 'MallActivityBargainRepository'
    private readonly client = new LafClient<MallActivityBargain>(MallActivityBargain.NAME)
    private readonly userStore = useUserStore()

    public createRequest = async (data: Partial<MallActivityBargain>): Promise<any> => {
        data.createTime = Date.now()
        data.updateTime = Date.now()
        data.createBy = this.userStore._id
        data.updateBy = this.userStore._id

        return await this.client.insert(data)
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => await this.client.updateById(id, {isDelete: LogicDelete.DELETED})

    public pageRequest = async (page: Page<MallActivityBargain>, query: Partial<MallActivityBargain>): Promise<Page<MallActivityBargain>> => {
        return this.client.queryWrapper()
            .likeNotEmpty('title', query.title)
            .eq('isDelete', LogicDelete.NORMAL)
            .orderByDesc('createTime')
            .page(page)
    }

    public updateRequest = async (data: Partial<MallActivityBargain>): Promise<any> => {
        data.updateTime = Date.now()
        data.updateBy = this.userStore._id

        return await this.client.updateById(data._id!, data, '_id')
    }


}
