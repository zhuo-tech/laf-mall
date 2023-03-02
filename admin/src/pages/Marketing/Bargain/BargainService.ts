import { MallActivityBargainRepository } from '@/repository/MallActivityBargainRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { MallActivityBargain } from 'common'

/**
 * BargainService
 * @author 冰凝
 * @date 2022-07-11 10:40:29
 **/
export class BargainService extends BasisCrud<MallActivityBargain> {

    private readonly repository: MallActivityBargainRepository = new MallActivityBargainRepository()
    protected override readonly request: CrudRequest<MallActivityBargain> = this.repository

}
