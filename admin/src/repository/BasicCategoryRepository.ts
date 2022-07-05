import { CrudRequest } from '@/service/CrudRequest'
import { BasicProductCategory, Component } from 'common'
import { LafClient, Page } from 'laf-db-query-wrapper'

/**
 * BasicCategoryRepository
 * @author 冰凝
 * @date 2022-07-04 下午 04:12
 **/
@Component(BasicCategoryRepository.KEY)
export class BasicCategoryRepository implements CrudRequest<BasicProductCategory> {
    public static readonly KEY = 'BasicCategoryRepository'

    private readonly client = new LafClient<BasicProductCategory>(BasicProductCategory.NAME)

    public createRequest = async (data: Partial<BasicProductCategory>): Promise<any> => {
        data.createTime = Date.now()
        data.updateTime = Date.now()
        return await this.client.insert(data)
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {
        return await this.client.deleteById(id)
    }

    public pageRequest = async (page: Page<BasicProductCategory>, query: Partial<BasicProductCategory>): Promise<Page<BasicProductCategory>> => {
        return await this.client.queryWrapper()
            .eqNotEmpty('name', query.name)
            .eqNotEmpty('isShow', query.isShow as any)
            .orderByDesc('createTime')
            .page(page)
    }

    public updateRequest = async (data: Partial<BasicProductCategory>): Promise<any> => {
        data.updateTime = Date.now()
        return await this.client.updateById(data._id!, data, '_id')
    }

}
