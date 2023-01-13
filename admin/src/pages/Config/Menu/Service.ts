import { UniversalConfigRepository } from '@/repository/UniversalConfigRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { MallConfigKey, Menu } from 'common'

type MenuAndId = Menu & { _id: string }

export class MenuService extends BasisCrud<MenuAndId> {

    public override formRule: Partial<Record<keyof Menu, Array<RuleItem>>> = {
        name: [{type: 'string', message: '必填', required: true}],
        cover: [{type: 'string', message: '请选择文件上传', required: true}],
        uniUrl: [{type: 'string', message: '必填', required: true}],
        pcUrl: [{type: 'string', message: '必填', required: true}],
    }
    protected override readonly request: CrudRequest<MenuAndId> = new UniversalConfigRepository(MallConfigKey.HOMEPAGE_MENU)

    protected override get formDataDefault(): Partial<Menu> {
        return Object.assign(new Menu(), {
            sort: 1,
            status: true,
        })
    }
}
