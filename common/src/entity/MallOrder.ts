import { MoneyType } from '../type/Financial'
import { AbstractMallActivity } from './AbstractMallActivity'
import { BasicProduct } from './BasicProduct'
import { BasicSpecProduct } from './BasicSpecProduct'
import { CanUpdateEntity, Entity } from './Entity'
import { BargainRule } from './MallActivityBargain'
import { GroupRule } from './MallActivityGroup'
import { SeckillRule } from './MallActivitySeckill'
import { SysUserAddress } from './SysUser'

/**
 * MallOrder
 * @author 冰凝
 * @date 2022-06-20 下午 02:14
 **/
export class MallOrder implements CanUpdateEntity {
    public static readonly NAME = 'mall_order'

    public _id: string
    /**
     * 生成的订单号
     */
    public orderId: string
    /**
     * 用户ID
     * @see SysUser._id
     */
    public userId: string
    /**
     * 微信 openId
     * @see SysUser.wxOpenId
     */
    public wxOpenId: string
    /**
     * 订单状态
     */
    public status: MallOrderStatus
    /**
     * 订单配送地址
     */
    public address: SysUserAddress

    /* ↑ 订单基础信息 */

    /**
     * 完成的订单商品信息列表; {@link activityProduct} {@link product} 只是对列表内容的补充
     */
    public specProduct: Array<BasicSpecProduct>
    /**
     * 活动商品信息
     * - key: 商品ID {@link BasicProduct._id}
     * - value: 营销活动基本信息
     */
    public activityProduct?: Record<string, Omit<AbstractMallActivity<any>, 'detail' | 'shareCount' | 'browseCount'>>
    /**
     * 活动商品 规格信息 (含活动价)
     * - key: 规格商品ID {@link BasicSpecProduct._id}
     * -value: 活动规则
     */
    public activityRule?: Record<string, SeckillRule | GroupRule | BargainRule>
    /**
     * 订单商品基础信息
     * - key: 商品ID {@link BasicProduct._id}
     * - value: 商品基础信息 作为存档保存
     */
    public product: Record<string, BasicProduct>
    /**
     * 使用的优惠券 <br>
     * TODO: 优惠券类型未定义
     */
    public coupon: Array<Entity>

    /* ↑ 存档: 订单商品信息 */

    /**
     * 所有商品总价: {@link specProduct} 汇总 + 活动商品汇总
     */
    public totalPrice: MoneyType
    /**
     * 运费
     */
    public freightPrice: MoneyType
    /**
     * 优惠金额 {@link coupon}
     */
    public cancelOutPrice: MoneyType
    /**
     * 总金额: {@link totalPrice} + {@link freightPrice} - {@link cancelOutPrice}
     */
    public totalAmount: MoneyType
    /**
     * 支付方式
     */
    public paymentMethod: string
    /**
     * 最终支付金额
     */
    public paymentAmount: MoneyType
    /**
     * 支付时间 {@link MallOrderStatus.PAYMENT_HAS_BEEN}
     */
    public paymentTime: number
    /**
     * 支付单号
     */
    public payOrder: string

    /* ↑ 订单金额, 支付 信息 */

    /**
     * 物流公司
     */
    public logisticsCompany: string
    /**
     * 运单号
     */
    public waybillNumber: string
    /**
     * 发货时间 {@link MallOrderStatus.SHIPPED}
     */
    public deliveryTime: number
    /**
     * 签收时间 {@link MallOrderStatus.HAVE_BEEN_RECEIVED}
     */
    public submissionTime: number
    /**
     * 完成时间 {@link MallOrderStatus.COMPLETED}
     */
    public completeTime: number

    /**
     * 消费者备注
     */
    public remark: string
    /**
     * 商家备注
     */
    public merchantNotes?: string

    // TODO 消费返利信息; 积分消费信息; 未定义

    public createBy?: string
    /**
     * 下单时间 {@link MallOrderStatus.SUBMITTED}
     */
    public createTime: number
    /**
     * 更新人 / 原因
     */
    public updateBy: string
    /**
     * 更新时间
     */
    public updateTime: number
}

/**
 * 订单状态, 不含售后状态(例如: 退款)
 */
export enum MallOrderStatus {
    /**
     * 已提交 未支付
     */
    SUBMITTED = 'SUBMITTED',
    /**
     * 已支付 未发货
     */
    PAYMENT_HAS_BEEN = 'PAYMENT_HAS_BEEN',
    /**
     * 已发货 未签收
     */
    SHIPPED = 'SHIPPED',
    /**
     * 已签收 (物流信息签收)
     */
    HAVE_BEEN_RECEIVED = 'HAVE_BEEN_RECEIVED',
    /**
     * 已完成 (订单终结)
     */
    COMPLETED = 'COMPLETED',
    /**
     * 已取消
     */
    CANCELLED = 'CANCELLED'
}
