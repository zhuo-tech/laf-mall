import { BasicCategoryRepository } from '@/repository/BasicCategoryRepository'
import BasisCrud from '@/service/BasisCrud'
import { RuleItem } from 'async-validator'
import { BasicProductCategory } from 'common'

/**
 * Service
 * @author 冰凝
 * @date 2022-07-04 下午 04:10
 **/
export class CategoryService extends BasisCrud<BasicProductCategory> {

    public readonly repository: BasicCategoryRepository = new BasicCategoryRepository()
    public override formRule: Partial<Record<keyof BasicProductCategory, Array<RuleItem>>> = {
        parentId: [ { type: 'string', required: false, message: '请选择上一级', trigger: 'blur' } ],
        cover: [ { type: 'string', required: true, message: '请选择文件上传', trigger: 'blur' } ],
        name: [ { type: 'string', required: true, message: '请输入', trigger: 'blur' } ],
        isShow: [ { type: 'boolean', required: true, message: '请选择', trigger: 'blur' } ],
    }
    protected override readonly request = this.repository as any

    protected override get formDataDefault(): Partial<BasicProductCategory> {
        const category = new BasicProductCategory()
        category.sort = 1
        return category
    }

    public prepareToAddChildNodes = (row: BasicProductCategory) => {
        this.readyAdd()
        this.formData.parentId = row._id
    }

}
