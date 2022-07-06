import { HotAndId, HotRepository } from '@/repository/HotRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { Hot } from 'common'

export class HotService extends BasisCrud<HotAndId> {

    public formRule: Partial<Record<keyof Hot, Array<RuleItem>>> = {
        tag: [{type: 'string', message: '必填', required: true}],
    }
    protected readonly request: CrudRequest<HotAndId> = new HotRepository()

    protected get formDataDefault(): Partial<Hot> {
        return Object.assign(new Hot(), {
            sort: 1,
            status: true,
        })
    }
}
