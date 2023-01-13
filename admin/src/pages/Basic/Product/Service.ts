import { BasicProductDetail, BasicProductRepository } from '@/repository/BasicProductRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'

export class ProductService extends BasisCrud<BasicProductDetail> {
    protected override readonly request: CrudRequest<BasicProductDetail> = new BasicProductRepository()
}
