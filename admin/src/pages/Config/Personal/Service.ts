import { UniversalConfigRepository } from '@/repository/UniversalConfigRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { MallConfigKey, Personal } from 'common'

type PersonalAndId = Personal & { _id: string }

export class PersonalService extends BasisCrud<PersonalAndId> {

    public override formRule: Partial<Record<keyof Personal, Array<RuleItem>>> = {
        name: [{type: 'string', message: '必填', required: true}],
        uniIcon: [{type: 'string', message: '请选择文件上传', required: true}],
        pcIcon: [{type: 'string', message: '请选择文件上传', required: true}],
        uniUrl: [{type: 'string', message: '必填', required: true}],
        pcUrl: [{type: 'string', message: '必填', required: true}],
    }

    protected override readonly request: CrudRequest<PersonalAndId> = new UniversalConfigRepository<Personal>(MallConfigKey.PERSONAL_CENTER)

    protected override get formDataDefault(): Partial<PersonalAndId> {
        return Object.assign(new Personal(), {
            sort: 1,
            status: true,
        })
    }

}
