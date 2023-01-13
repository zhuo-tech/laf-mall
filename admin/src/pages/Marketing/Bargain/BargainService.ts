import { MallActivityBargainRepository } from '@/repository/MallActivityBargainRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { Inject, MallActivityBargain } from 'common'

/**
 * BargainService
 * @author 冰凝
 * @date 2022-07-11 10:40:29
 **/
export class BargainService extends BasisCrud<MallActivityBargain> {

    protected override readonly request: CrudRequest<MallActivityBargain> = this.repository

    @Inject(MallActivityBargainRepository.KEY)
    private get repository(): MallActivityBargainRepository {
        return null as any
    }

}
