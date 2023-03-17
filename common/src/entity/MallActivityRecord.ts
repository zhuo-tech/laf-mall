import { MoneyType } from '../type'
import { ReadonlyEntity } from './Entity'

/**
 * <h2>商场活动 参与记录</h2>
 *
 * @author 冰凝
 * @date 2022-07-06 下午 04:45
 **/
export class MallActivityRecord implements ReadonlyEntity {
    public static readonly NAME = 'mall_activity_record'

    public _id: string
    /**
     * 活动类型
     */
    public type: ActivityType
    /**
     * 活动ID
     * @see MallActivityBargain._id
     * @see MallActivityGroup._id
     * @see MallActivitySeckill._id
     */
    public activityId: string
    /**
     * 用户ID 活动参与方
     * @see SysUser._id
     */
    public userId: string
    /**
     * 冗余 商品ID
     * @see AbstractMallActivity.productId
     */
    public productId: string
    /**
     * 冗余 规格产品ID
     * @see AbstractMallActivity.detail
     */
    public specId: string

    /**
     * 最终价格, 这个金额应该作为提交订单时的参考价格
     * - 砍价 {@link BargainRule.minPrice} {@link BargainRule.price}
     * - 拼团 {@link GroupRule.price}
     * - 秒杀 {@link SeckillRule.price}
     */
    public price: MoneyType

    /**
     * 记录信息
     * 秒杀不需要
     */
    public record?: Array<BargainRecord | GroupItem>

    public createBy: string
    public createTime: number
}

/**
 * 活动类型
 */
export enum ActivityType {
    BARGAIN = '砍价',
    GROUP = '拼团',
    SECKILL = '秒杀'
}

/**
 * <h3>砍价记录</h3>
 * 砍价记录: 活动参与方和帮忙砍价的用户 <br>
 * 用户信息 需要关联查询
 */
export class BargainRecord {
    /**
     * 砍价用户
     * @see SysUser._id
     */
    public userId: string
    /**
     * 砍掉的金额
     * @see MallActivityBargain.priceRange
     * @see MallActivityBargain.minPrice
     */
    public money: MoneyType
    /**
     * 时间
     */
    public time: number
}

/**
 * <h3>拼团记录</h3>
 * 用户信息需要关联查询展示
 */
export class GroupItem {
    /**
     * 砍价用户
     * @see SysUser._id
     */
    public userId: string
}
