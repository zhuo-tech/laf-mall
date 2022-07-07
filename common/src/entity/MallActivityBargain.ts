import { AbstractMallActivity } from './AbstractMallActivity'
import { MoneyType } from '../type/Financial'

/**
 * <h2>商场活动 砍价</h2>
 * - 除非明确指定, 否则所有字段不可为空(null/undefined); 默认使用无意义默认值填充;
 * - 支持逻辑删除
 *
 * <h3>备忘</h3>
 * - 成本价, 邮费, 取 {@link BasicSpecProduct.cost} {@link BasicSpecProduct.postage} 这里不额外保存;
 * - 包邮规则也继承自 {@link BasicSpecProduct}
 * - 不设自动开启开关, 所有活动 根据 {@link MallActivityBargain.start} {@link MallActivityBargain.stop} 自动开启和关闭
 *
 * - 需要维护浏览量和分享计数 {@link MallActivityBargain.browseCount} {@link MallActivityBargain.shareCount}
 *
 * @author 冰凝
 * @date 2022-07-06 下午 02:25
 **/
export class MallActivityBargain extends AbstractMallActivity<BargainRule> {
    public static readonly NAME = 'mall_activity_bargain'

    /**
     * 单用户可以砍价次数
     */
    public frequency: number
    /**
     * 允许单用户重复参加? 默认 {@code false}
     */
    public repeatable: boolean

}

/**
 * 砍价规则
 */
export class BargainRule {
    /**
     * 库存, 0 表示不限制
     */
    public stock: number
    /**
     * 销量
     */
    public sales: number
    /**
     * 起始价格
     */
    public price: MoneyType
    /**
     * 最低价格
     */
    public minPrice: MoneyType
    /**
     * 单次砍价 价格范围: [min, max]
     */
    public priceRange: [MoneyType, MoneyType]
}
