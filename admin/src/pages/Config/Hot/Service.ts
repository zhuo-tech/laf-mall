import { UniversalConfigRepository } from '@/repository/UniversalConfigRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { Hot, MallConfigKey } from 'common'

type HotAndId = Hot & { _id: string }

export class HotService extends BasisCrud<HotAndId> {

    public override formRule: Partial<Record<keyof Hot, Array<RuleItem>>> = {
        tag: [{type: 'string', message: '必填', required: true}],
    }
    protected override readonly request: CrudRequest<HotAndId> = new UniversalConfigRepository(MallConfigKey.HOMEPAGE_HOT)

    protected override get formDataDefault(): Partial<Hot> {
        return Object.assign(new Hot(), {
            sort: 1,
            status: true,
        })
    }
}
