import { BasicSpecRepository } from '@/repository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { BasicSpec } from 'common'

/**
 * Service
 * @author 冰凝
 * @date 2022-06-20 下午 05:53
 **/
export class BasicSpecService extends BasisCrud<BasicSpec> {
    public override formRule: Partial<Record<keyof BasicSpec, Array<RuleItem>>> = {
        name: [ { type: 'string', required: true, message: '请输入', trigger: 'blur' } ],
        item: [ { type: 'array', required: true, message: '请输入', trigger: 'blur' } ],
    }
    protected override readonly request: CrudRequest<BasicSpec> = BasicSpecRepository.API

    protected override get formDataDefault(): Partial<BasicSpec> {
        return new BasicSpec()
    }

}
