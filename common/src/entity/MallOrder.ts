import { BasicProduct } from '../entity/BasicProduct'
import { CanUpdateEntity } from '../entity/Entity'
import { SysUserAddress } from '../entity/SysUser'
import { MoneyType } from '../type/Financial'

/**
 * MallOrder
 * @author 冰凝
 * @date 2022-06-20 下午 02:14
 **/
export class MallOrder implements CanUpdateEntity {
    public static readonly NAME = 'mall_order'

    public _id: string
    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number

    /**
     * 订单状态
     */
    public status: MallOrderStatus
    /**
     * 订单配送地址
     */
    public address: SysUserAddress
    /**
     * 订单商品
     * TODO: 存ID 还是当时商品信息, 不确定, 活动信息未明确
     */
    public product: Array<BasicProduct>

    // TODO: 更多信息. 未定义

    /**
     * 消费者备注
     */
    public remark: string

    /**
     * 总金额
     */
    public totalAmount: MoneyType
    /**
     * 支付金额
     */
    public paymentAmount: MoneyType

}

/**
 * 订单状态, 不含售后状态(例如: 退款)
 */
export enum MallOrderStatus {
    /**
     * 已提交
     */
    SUBMITTED = 'SUBMITTED',
    /**
     * 已付款
     */
    PAYMENT_HAS_BEEN = 'PAYMENT_HAS_BEEN',
    /**
     * 已发货
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
