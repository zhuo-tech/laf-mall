import { BasicSpecProduct } from './BasicSpecProduct'
import { CanUpdateEntity } from './Entity'

/**
 * 购物车
 * @author 冰凝
 * @date 2022-06-20 下午 01:20
 **/
export class MallShopCart implements CanUpdateEntity {
    public static readonly NAME = 'mall_shop_cart'
    public _id: string
    /**
     * 用户ID
     * @see SysUser._id
     */
    public userId: string
    /**
     * 商品ID
     * @see BasicProduct._id
     */
    public productId: string
    /**
     * 规格ID
     * @see BasicSpecProduct._id
     */
    public specId: string
    /**
     * 数量, 最小1
     */
    public amount: number
    /**
     * 加入购物车时的商品规格信息
     */
    public specInfo: BasicSpecProduct

    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number
}
