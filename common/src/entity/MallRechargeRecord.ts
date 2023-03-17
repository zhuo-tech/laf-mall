import { MoneyType } from '../type'
import { ReadonlyEntity } from './Entity'

/**
 * MallRechargeRecord
 * @author 冰凝
 * @date 2022-06-20 下午 02:45
 **/
export class MallRechargeRecord implements ReadonlyEntity {
    public static readonly NAME = 'mall_recharge_record'

    public _id: string
    /**
     * 用户ID
     * @see SysUser._id
     */
    public uid: string
    /**
     * 充值金额
     */
    public money: MoneyType
    /**
     * 支付金额
     */
    public paymentAmount: MoneyType
    /**
     * 充值之前余额
     */
    public beforeBalance: MoneyType
    /**
     * 充值之后余额
     */
    public afterBalance: MoneyType
    /**
     * 备注
     */
    public remark: string

    public createBy: string
    public createTime: number
}
