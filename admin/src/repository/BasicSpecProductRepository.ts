import { CrudRequest } from '@/service/CrudRequest'
import { useUserStore } from '@/store/user'
import { BasicSpec, BasicSpecProduct } from 'common'
import { LafClient, Page, QueryChainWrapper } from 'laf-db-query-wrapper'

/**
 * BasicSpecProductRepository
 * @author 冰凝
 * @date 2022-07-08 上午 10:38
 **/
export class BasicSpecProductRepository implements CrudRequest<BasicSpecProduct> {
    private readonly client = new LafClient<BasicSpecProduct>(BasicSpecProduct.NAME)
    private readonly store = useUserStore()

    public createRequest = async (data: Partial<BasicSpecProduct>): Promise<any> => {
        data.createTime = Date.now()
        data.createBy = this.store._id
        data.updateTime = Date.now()
        data.updateBy = this.store._id

        return await this.client.insert(data)
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {
        return await this.client.deleteById(id)
    }

    public pageRequest = async (page: Page<BasicSpecProduct>, query: Partial<BasicSpecProduct>): Promise<Page<BasicSpecProduct>> => {
        return await this.client.queryWrapper()
            .likeNotEmpty('specName', query.specName)
            .likeNotEmpty('display', query.display)
            .likeNotEmpty('barCode', query.barCode)
            .page(page)
    }

    public updateRequest = async (data: Partial<BasicSpecProduct>): Promise<any> => {
        data.updateTime = Date.now()
        data.updateBy = this.store._id
        return await this.client.updateById(data._id!, data, '_id')
    }

    /**
     * 查询指定商品所有规格
     * @param id {@link BasicProduct._id}
     */
    public async getByProductId(id: string): Promise<Array<BasicSpecProductDetail>> {
        const withSpec = await new QueryChainWrapper<BasicSpec>(BasicSpec.NAME)
            .show('_id', 'name')
            .getWithArg<BasicSpecProduct>('_id', 'specGroupId', 'group')

        const list = await this.client.queryWrapper()
            .eq('productId', id)
            .orderByAsc('createTime')
            .withOne(withSpec)
            .list(10000) as Array<BasicSpecProduct & { group: BasicSpecDisplay }>

        list.forEach(i => i['groupName'] = i.group?.name)

        return list
    }

}

export type BasicSpecProductDetail = BasicSpecProduct & { groupName?: BasicSpecDisplay }
export type BasicSpecDisplay = Pick<BasicSpec, '_id' | 'name'>
