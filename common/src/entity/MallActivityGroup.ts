import { MoneyType } from '../type/Financial'
import { AbstractMallActivity } from './AbstractMallActivity'

/**
 * <h2>商城活动 拼团</h2>
 * - 除非明确指定, 否则所有字段不可为空(null/undefined); 默认使用无意义默认值填充;
 * - 支持逻辑删除
 *
 * <h3>备忘</h3>
 * - 成本价, 邮费, 取 {@link BasicSpecProduct.cost} {@link BasicSpecProduct.postage} 这里不额外保存;
 * - 包邮规则也继承自 {@link BasicSpecProduct}
 * - 不设自动开启开关, 所有活动 根据 {@link MallActivityGroup.start} {@link MallActivityGroup.stop} 自动开启和关闭
 * - 需要维护浏览量和分享计数 {@link MallActivityGroup.browseCount} {@link MallActivityGroup.shareCount}
 *
 * @author 冰凝
 * @date 2022-07-06 下午 02:27
 **/
export class MallActivityGroup extends AbstractMallActivity<GroupRule> {
    public static readonly NAME = 'mall_activity_group'

    /**
     * 几人成团? 最低 1
     */
    public size: number
    /**
     * 最大购买数量 一次拼团最多买几件
     */
    public quantity: number
    /**
     * 允许单用户重复参加? 默认 {@code false}
     */
    public repeatable: boolean

}

/**
 * 拼团规则
 */
export class GroupRule {
    /**
     * 库存, 0 表示不限制
     */
    public stock: number
    /**
     * 销量
     */
    public sales: number
    /**
     * 拼团价
     */
    public price: MoneyType
}
