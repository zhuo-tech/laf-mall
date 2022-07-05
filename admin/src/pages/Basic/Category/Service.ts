import { BasicCategoryRepository } from '@/repository/BasicCategoryRepository'
import BasisCrud from '@/service/BasisCrud'
import { RuleItem } from 'async-validator'
import { BasicProductCategory, Inject } from 'common'

/**
 * Service
 * @author 冰凝
 * @date 2022-07-04 下午 04:10
 **/
export class CategoryService extends BasisCrud<BasicProductCategory> {

    protected readonly request = this.repository

    @Inject(BasicCategoryRepository.KEY)
    private get repository(): BasicCategoryRepository {
        return null as any
    }

    public formRule: Partial<Record<keyof BasicProductCategory, Array<RuleItem>>> = {
        cover: [{type: 'string', required: true, message: '请选择文件上传', trigger: 'blur'}],
        name: [{type: 'string', required: true, message: '请输入', trigger: 'blur'}],
        isShow: [{type: 'boolean', required: true, message: '请选择', trigger: 'blur'}],
    }

    protected get formDataDefault(): Partial<BasicProductCategory> {
        const category = new BasicProductCategory()
        category.sort = 1
        return category
    }

}
