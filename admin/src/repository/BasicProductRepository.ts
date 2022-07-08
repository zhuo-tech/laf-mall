import { BasicSpecProductDetail, BasicSpecProductRepository } from '@/repository/BasicSpecProductRepository'
import { CrudRequest } from '@/service/CrudRequest'
import { useUserStore } from '@/store/user'
import { BasicProduct, BasicProductCategory, Component, Inject, LogicDelete } from 'common'
import { LafClient, Page, QueryChainWrapper } from 'laf-db-query-wrapper'

/**
 * BasicProductRepository
 * @author 冰凝
 * @date 2022-06-20 下午 05:33
 **/
@Component(BasicProductRepository.KEY)
export class BasicProductRepository implements CrudRequest<BasicProductDetail> {
    public static readonly KEY = 'BasicProductRepository'
    private readonly client = new LafClient<BasicProduct>(BasicProduct.NAME)
    private readonly userStore = useUserStore()

    @Inject(BasicSpecProductRepository.KEY)
    private get specProductRepository(): BasicSpecProductRepository {
        return null as any
    }

    /**
     * 获取商品 - 商品分类 关联参数
     * 使用此查询的结果仅包含有限的属性: {@link ProductCategoryDisplay}
     */
    private static get withCategory() {
        return new QueryChainWrapper<BasicProductCategory>(BasicProductCategory.NAME)
            .show('_id', 'name')
            .getWithArg<BasicProduct>('_id', 'categoryId', 'category')
    }

    public createRequest = async (data: Partial<BasicProductDetail>): Promise<any> => {
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

    public pageRequest = async (page: Page<BasicProductDetail>, query: Partial<BasicProductDetail>): Promise<Page<BasicProductDetail>> => {
        return await this.client.queryWrapper()
            .likeNotEmpty('name', query.name)
            .eqNotEmpty('categoryId', query.categoryId)
            .inNotEmpty('keyword', query.keyword)
            .eqNotEmpty('specType', query.specType as any)
            .eq('isDelete', LogicDelete.NORMAL)
            .withOne(BasicProductRepository.withCategory)
            .orderByDesc('createTime')
            .page(page)
    }

    public updateRequest = async (data: Partial<BasicProductDetail>): Promise<any> => {
        data.updateTime = Date.now()
        data.updateBy = this.userStore._id
        return await this.client.updateById(data._id!, data, '_id')
    }

    /**
     * 商品详细信息
     * - 含 商品分类名
     * - 含 规格信息列表 specArr
     * @param id {@link BasicProduct._id}
     * @param selectSpec 关联查询商品规格信息, 默认 true
     */
    public async detail(id: string, selectSpec: boolean = true): Promise<BasicProductDetail & { specArr: Array<BasicSpecProductDetail> } | null> {
        if (!id) {
            return null
        }

        const product = await this.client.queryWrapper()
            .eq('isDelete', LogicDelete.NORMAL)
            .eq('_id', id)
            .withOne(BasicProductRepository.withCategory)
            .one()

        if (!product) {
            return null
        }
        product['specArr'] = await this.specProductRepository.getByProductId(id)

        return product as any
    }

}

export type BasicProductDetail = BasicProduct & {
    category?: ProductCategoryDisplay
}

export type ProductCategoryDisplay = Pick<BasicProductCategory, '_id' | 'name'>
