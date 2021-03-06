import { CrudRequest } from '@/service/CrudRequest'
import { BasicProductCategory, Component } from 'common'
import { LafClient, Page } from 'laf-db-query-wrapper'
import { CollUtil } from 'typescript-util'

export type BasicProductCategoryTree = BasicProductCategory & {
    children: Array<BasicProductCategoryTree>
}

/**
 * BasicCategoryRepository
 * @author ε°ε
 * @date 2022-07-04 δΈε 04:12
 **/
@Component(BasicCategoryRepository.KEY)
export class BasicCategoryRepository implements CrudRequest<BasicProductCategoryTree> {
    public static readonly KEY = 'BasicCategoryRepository'

    private readonly client = new LafClient<BasicProductCategoryTree>(BasicProductCategory.NAME)

    private static buildTree<E extends BasicProductCategory>(list: Array<E>): Array<E> {
        return CollUtil.buildTree(list, i => !i.parentId || i.parentId === '0',
            // @ts-ignore
            '_id', 'parentId', 'children')
    }

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
        const list = categoryPage.list.sort((a, b) => a.sort - b.sort)
        categoryPage.list = BasicCategoryRepository.buildTree(list)

        return categoryPage
    }

    public updateRequest = async (data: Partial<BasicProductCategoryTree>): Promise<any> => {
        data.updateTime = Date.now()
        delete data.children
        return await this.client.updateById(data._id!, data, '_id')
    }

    /**
     * εεεη±» ζ ε½’ζ°ζ?
     * δ»ζζιηζ ε½’: id name η­
     * @return Promise<Array<ProductCategoryTreeNode>>
     */
    public categoryTree = async (): Promise<Array<ProductCategoryTreeNode>> => {
        const list = await this.client.queryWrapper()
            .show('_id', 'name', 'parentId')
            .orderByAsc('sort')
            .list(1000)

        return BasicCategoryRepository.buildTree(list) as any
    }

}

export type ProductCategoryTreeNode = Pick<BasicProductCategory, '_id' | 'name' | 'parentId'> & {
    children?: Array<ProductCategoryTreeNode>
}
