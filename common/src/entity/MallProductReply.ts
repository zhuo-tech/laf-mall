import { LogicDelete } from '../constant'
import { IntegralEntity } from './Entity'

/**
 * <h2>商城产品回复 / 评价</h2>
 * - 除非明确指定, 否则所有字段不可为空(null/undefined); 默认使用无意义默认值填充;
 * - 支持逻辑删除, 也就是可以删评; 我们不妨以最大的恶意揣测商家/用户;
 *
 * @author 冰凝
 * @date 2022-07-06 下午 01:44
 **/
export class MallProductReply implements IntegralEntity {
    public static readonly NAME = 'mall_product_reply'

    public _id: string
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
     * 订单ID
     * @see MallOrder._id
     */
    public orderId: string
    /**
     * 用户ID
     * @see SysUser._id
     */
    public userId: string

    /**
     * 评论内容, 纯文本
     */
    public content: string
    /**
     * 附图
     */
    public imgList?: Array<string>
    /**
     * 商品评分
     */
    public productScore: number
    /**
     * 店铺评分
     */
    public shopScore: number
    /**
     * 物流评分
     */
    public logisticsScore: number
    /**
     * 商家回复
     */
    public reply?: string

    public createBy: string
    public createTime: number
    public isDelete: LogicDelete
    public updateBy: string
    public updateTime: number
}
