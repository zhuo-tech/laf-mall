import { SeckillTimePeriod } from '../entity/MallConfig'
import { MoneyType } from '../type/Financial'
import { AbstractMallActivity } from './AbstractMallActivity'

/**
 * <h2>商场活动 秒杀</h2>
 * - 除非明确指定, 否则所有字段不可为空(null/undefined); 默认使用无意义默认值填充;
 * - 支持逻辑删除
 *
 * <h3>备忘</h3>
 * - 成本价, 邮费, 取 {@link BasicSpecProduct.cost} {@link BasicSpecProduct.postage} 这里不额外保存;
 * - 包邮规则也继承自 {@link BasicSpecProduct}
 * - 不设自动开启开关, 所有活动 根据 {@link MallActivitySeckill.start} {@link MallActivitySeckill.stop} 自动开启和关闭;
 * - 需要维护浏览量和分享计数 {@link MallActivitySeckill.browseCount} {@link MallActivitySeckill.shareCount}
 *
 * <h3 color="red">注意: start stop 时间段 和其他活动不同</h3>
 * 即使 {@link MallActivitySeckill.start} 已满足, 秒杀活动也可能没有开启 (秒杀时间段未到); <br>
 * 即使 {@link MallActivitySeckill.stop} 未满足, 秒杀活动也可能已结束 (秒杀时间段已结束); <br>
 * {@link MallActivitySeckill.start} {@link MallActivitySeckill.stop} 时间范围内, 秒杀时间段满足的情况下 允许秒杀活动多次开启和关闭
 *
 * @author 冰凝
 * @date 2022-07-06 下午 02:26
 **/
export class MallActivitySeckill extends AbstractMallActivity<SeckillRule> {
    public static readonly NAME = 'mall_activity_seckill'

    /**
     * 秒杀时间段
     * @see MallConfig._id
     * @see MallConfigKey.SECKILL_TIME_PERIOD
     */
    public time: SeckillTimePeriod
    /**
     * 单次秒杀商品数量限制
     */
    public quantity: number
    /**
     * 活动标签
     */
    public tag: Array<SeckillTag>
    /**
     * 允许单用户重复参加? 默认 {@code false}
     */
    public repeatable: boolean

}

/**
 * 秒杀规则
 */
export class SeckillRule {
    /**
     * 库存, 0 表示不限制
     */
    public stock: number
    /**
     * 销量
     */
    public sales: number
    /**
     * 秒杀价
     */
    public price: MoneyType
}

/**
 * 秒杀标签
 */
export interface SeckillTag {
    name: string
}
