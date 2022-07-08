import { BasicCategoryRepository, BasicProductCategoryTree } from '@/repository/BasicCategoryRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'

export class ProductService extends BasisCrud<any> {
    protected readonly request: CrudRequest<BasicProductCategoryTree> = new BasicCategoryRepository()
}
