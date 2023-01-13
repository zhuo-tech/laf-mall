import { UniversalConfigRepository } from '@/repository/UniversalConfigRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { HomePageChannel, MallConfigKey } from 'common'

type ChannelAndId = HomePageChannel & { _id: string }
export type TagType = {
    id: string,
    name: string
}

export class ChannelService extends BasisCrud<ChannelAndId> {

    public override formRule: Partial<Record<keyof ChannelAndId, Array<RuleItem>>> = {
        name: [{type: 'string', message: '必填', required: true}],
        children: [{type: 'array', message: '必填', required: true}],
    }

    protected override readonly request: CrudRequest<ChannelAndId> = new UniversalConfigRepository<HomePageChannel>(MallConfigKey.HOMEPAGE_CHANNEL)

    protected override get formDataDefault(): Partial<HomePageChannel> {
        return Object.assign(new HomePageChannel(), {
            sort: 1,
            children: [] as TagType[],
        })
    }

    public update = (data: TagType[]) => {
        this.formDataDefault.children = data
    }
}
