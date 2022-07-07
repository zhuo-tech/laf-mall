import { CrudRequest } from '@/service/CrudRequest'
import { useUserStore } from '@/store/user'
import { BasicProduct, BasicProductCategory, Component, LogicDelete } from 'common'
import { LafClient, Page, QueryChainWrapper } from 'laf-db-query-wrapper'

/**
 * BasicProductRepository
 * @author 冰凝
 * @date 2022-06-20 下午 05:33
 **/
@Component(BasicProductRepository.KEY)
export class BasicProductRepository implements CrudRequest<BasicProduct> {
    public static readonly KEY = 'BasicProductRepository'
    private readonly client = new LafClient<BasicProduct>(BasicProduct.NAME)
    private readonly userStore = useUserStore()

    public createRequest = async (data: Partial<BasicProduct>): Promise<any> => {
        const now = Date.now()
        data.createTime = now
        data.updateTime = now
        data.createBy = this.userStore._id
        data.updateBy = this.userStore._id
        data.isDelete = LogicDelete.NORMAL

        return await this.client.insert(data)
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {
        return await this.client.updateById(id, {isDelete: LogicDelete.DELETED})
    }

    public pageRequest = async (page: Page<BasicProduct>, query: Partial<BasicProduct>): Promise<Page<BasicProduct>> => {

        const withCategory = new QueryChainWrapper<BasicProductCategory>(BasicProductCategory.NAME)
            .show('_id', 'name')
            .getWithArg<BasicProduct>('_id', 'categoryId', 'category')

        return await this.client.queryWrapper()
            .likeNotEmpty('name', query.name)
            .eqNotEmpty('categoryId', query.categoryId)
            .inNotEmpty('keyword', query.keyword)
            .eqNotEmpty('specType', query.specType as any)
            .withOne(withCategory)
            .orderByDesc('createTime')
            .page(page)
    }

    public updateRequest = async (data: Partial<BasicProduct>): Promise<any> => {
        data.updateTime = Date.now()
        data.updateBy = this.userStore._id
        return await this.client.updateById(data._id!, data, '_id')
    }

}
