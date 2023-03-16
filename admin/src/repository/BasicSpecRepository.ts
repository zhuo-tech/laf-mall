import { CrudRequest } from '@/service/CrudRequest'
import { useUserStore } from '@/store/user'
import { BasicSpec } from 'common'
import { LafClient, Page } from 'laf-db-query-wrapper'

export class BasicSpecRepository implements CrudRequest<BasicSpec> {
    public static readonly API = new BasicSpecRepository()
    private readonly userStore = useUserStore()
    private readonly client = new LafClient<BasicSpec>(BasicSpec.NAME)

    public createRequest = (data: Partial<BasicSpec>): Promise<any> => {
        const now = Date.now()
        data.createTime = now
        data.updateTime = now
        data.createBy = this.userStore._id
        data.updateBy = this.userStore._id

        return this.client.insert(data)
    }

    public deleteByIdRequest = (id: string | number): Promise<any> => {
        return this.client.deleteById(id)
    }

    public pageRequest = (page: Page<BasicSpec>, query: Partial<BasicSpec>): Promise<Page<BasicSpec>> => {
        return this.client.queryWrapper()
            .likeNotEmpty('name', query?.name)
            .inNotEmpty('item', query.item)
            .page(page)
    }

    public updateRequest = (data: Partial<BasicSpec>): Promise<any> => {
        data.updateTime = Date.now()
        data.updateBy = this.userStore._id

        return this.client.updateById(data._id!, data, '_id')
    }
}
