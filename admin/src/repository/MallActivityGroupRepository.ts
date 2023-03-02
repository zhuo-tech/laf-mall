import { CrudRequest } from '@/service/CrudRequest'
import { useUserStore } from '@/store/user'
import { LogicDelete, MallActivityGroup } from 'common'
import { LafClient, Page } from 'laf-db-query-wrapper'

/**
 * MallActivityGroupRepository
 * @author 冰凝
 * @date 2022-07-11 10:50:00
 **/
export class MallActivityGroupRepository implements CrudRequest<MallActivityGroup> {
    private readonly client = new LafClient<MallActivityGroup>(MallActivityGroup.NAME)
    private readonly userStore = useUserStore()

    public createRequest = async (data: Partial<MallActivityGroup>): Promise<any> => {
        data.createTime = Date.now()
        data.updateTime = Date.now()
        data.createBy = this.userStore._id
        data.updateBy = this.userStore._id

        return await this.client.insert(data)
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => await this.client.updateById(id, { isDelete: LogicDelete.DELETED })

    public pageRequest = async (page: Page<MallActivityGroup>, query: Partial<MallActivityGroup>): Promise<Page<MallActivityGroup>> => {
        return this.client.queryWrapper()
            .likeNotEmpty('title', query.title)
            .eq('isDelete', LogicDelete.NORMAL)
            .orderByDesc('createTime')
            .page(page)
    }

    public updateRequest = async (data: Partial<MallActivityGroup>): Promise<any> => {
        data.updateTime = Date.now()
        data.updateBy = this.userStore._id

        return await this.client.updateById(data._id!, data, '_id')
    }

}
