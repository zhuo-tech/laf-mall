import { CrudRequest } from '@/service/CrudRequest'
import { BasicProductCategory, Component } from 'common'
import { LafClient, Page } from 'laf-db-query-wrapper'
import { CollUtil } from 'typescript-util'

export type BasicProductCategoryTree = BasicProductCategory & {
    children: Array<BasicProductCategoryTree>
}

/**
 * BasicCategoryRepository
 * @author 冰凝
 * @date 2022-07-04 下午 04:12
 **/
@Component(BasicCategoryRepository.KEY)
export class BasicCategoryRepository implements CrudRequest<BasicProductCategoryTree> {
    public static readonly KEY = 'BasicCategoryRepository'

    private readonly client = new LafClient<BasicProductCategoryTree>(BasicProductCategory.NAME)

    public createRequest = async (data: Partial<BasicProductCategoryTree>): Promise<any> => {
        data.createTime = Date.now()
        data.updateTime = Date.now()
        delete data.children
        return await this.client.insert(data)
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {
        return await this.client.deleteById(id)
    }

    public pageRequest = async (page: Page<BasicProductCategoryTree>, query: Partial<BasicProductCategoryTree>): Promise<Page<BasicProductCategoryTree>> => {
        const categoryPage = await this.client.queryWrapper()
            .eqNotEmpty('name', query.name)
            .eqNotEmpty('isShow', query.isShow as any)
            .orderByDesc('createTime')
            .page(new Page(1, 1000))

        if (CollUtil.isEmpty(categoryPage.list)) {
            return categoryPage
        }
        categoryPage.list = CollUtil.buildTree(
            categoryPage.list.sort(i => i.sort),
            i => !i.parentId || i.parentId === '0',
            '_id',
            'parentId',
            'children')

        return categoryPage
    }

    public updateRequest = async (data: Partial<BasicProductCategoryTree>): Promise<any> => {
        data.updateTime = Date.now()
        delete data.children
        return await this.client.updateById(data._id!, data, '_id')
    }

}
