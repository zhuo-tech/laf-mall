import { CanUpdateEntity } from '../entity/Entity'
import { TreeNode } from '../type/TreeNode'

/**
 * 基本产品类别
 * @author 冰凝
 * @date 2022-06-20 下午 01:58
 **/
export class BasicProductCategory implements CanUpdateEntity, TreeNode<BasicProductCategory> {
    public static readonly NAME = 'basic_product_category'

    public _id: string
    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number

    public parentId: string

    /**
     * 分类名称
     */
    public name: string
    /**
     * 排序
     */
    public sort: number
    /**
     * 封面
     */
    public cover: string
    /**
     * 是否显示
     */
    public isShow: boolean
}
