import { MenuRepository } from '@/repository/MenuRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { Menu } from 'common'

export class MenuService extends BasisCrud<Menu> {

    public formRule: Partial<Record<keyof Menu, Array<RuleItem>>> = {
        name: [{type: 'string', message: '必填', required: true}],
        cover: [{type: 'string', message: '请选择文件上传', required: true}],
        uniUrl: [{type: 'string', message: '必填', required: true}],
        pcUrl: [{type: 'string', message: '必填', required: true}],
    }
    protected readonly request: CrudRequest<Menu> = new MenuRepository()

    protected get formDataDefault(): Partial<Menu> {
        return Object.assign(new Menu(), {
            sort: 1,
            status: true,
        })
    }
}


