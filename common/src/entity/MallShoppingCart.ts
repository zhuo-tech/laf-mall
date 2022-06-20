import { MoneyType } from '../type/Financial'
import { CanUpdateEntity } from './Entity'

/**
 * 购物车
 * @author 冰凝
 * @date 2022-06-20 下午 01:20
 **/
export class MallShopCart implements CanUpdateEntity {
    public static readonly NAME = 'mall_shop_cart'
    public _id: string
    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number

    /**
     * 商品列表
     */
    public list: Array<MallShopCartItem>
    /**
     * 选中的商品ID列表
     */
    public selected: Array<string>
}

/**
 * 购物车商品
 */
export class MallShopCartItem {
    /**
     * 商品ID
     * @see BasicProduct._id
     */
    public productId: string
    /**
     * 加入时的价格
     */
    public priceOnCreate: MoneyType
    /**
     * 数量, 最小1
     */
    public amount: number
    /**
     * 有效, 默认 true
     * 明确置为 false 时, 此项不可用
     */
    public isEffective: boolean

}
