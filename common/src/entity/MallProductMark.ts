import { BasicSpecProduct } from './BasicSpecProduct'
import { ReadonlyEntity } from './Entity'

/**
 * 商城产品收藏/点赞
 *
 * @author 冰凝
 * @date 2022-07-06 下午 01:55
 **/
export class MallProductMark implements ReadonlyEntity {
    public static readonly NAME = 'mall_product_mark'

    public _id: string
    /**
     * 类型
     */
    public type: MarkType
    /**
     * 商品ID
     * @see BasicProduct._id
     */
    public productId: string
    /**
     * 规格商品ID
     * @see BasicSpecProduct._id
     */
    public specId: string
    /**
     * 用户ID
     * @see SysUser._id
     */
    public userId: string
    /**
     * 可选: mark 时的商品价格属性信息;
     */
    public transient?: Partial<BasicSpecProduct>

    public createBy: string
    public createTime: number
}

export enum MarkType {
    /**
     * 收藏
     */
    COLLECT = 0,
    /**
     * 点赞
     */
    LIKE = 1
}
