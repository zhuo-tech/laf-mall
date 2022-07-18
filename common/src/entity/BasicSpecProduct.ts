import { MoneyType } from '../type/Financial'
import { CanUpdateEntity } from './Entity'

/**
 * <h2>商城规格产品</h2>
 * - 除非明确指定, 否则所有字段不可为空(null/undefined); 默认使用无意义默认值填充;
 * - 不支持逻辑删除
 *
 * <h3>备忘</h3>
 * - 秒杀/砍价/拼团 活动价格移至活动信息维护
 * - TODO: 分销相关未定义
 *
 * @see BasicProduct
 * @see BasicSpec
 * @author 冰凝
 * @date 2022-07-06 下午 12:25
 **/
export class BasicSpecProduct implements CanUpdateEntity {
    public static readonly NAME = 'basic_spec_product'
    public _id: string
    /**
     * 关联商品ID
     * @see BasicProduct._id
     */
    public productId: string
    /**
     * 规格组ID; 显示时需要关联查询 {@link BasicSpec.name}
     * @see BasicSpec._id
     */
    public specGroupId: string
    /**
     * 规格名称 {@link BasicSpec.item} 中一项; 不允许修改;
     */
    public specName: string
    /**
     * 展示的规格名称 默认 等于 {@link specName}; 可随意修改
     */
    public display: string
    /**
     * 封面图
     */
    public cover?: string
    /**
     * 轮播图
     */
    public carousel?: Array<string>

    /* ↑ 基础信息 */

    /**
     * 商品条形码
     * @see BasicProduct.barCode
     */
    public barCode: string
    /**
     * 库存
     */
    public stock: number
    /**
     * 销量
     */
    public sales: number
    /**
     * 价格
     */
    public price: MoneyType
    /**
     * 成本价
     */
    public cost: MoneyType
    /**
     * 原价
     */
    public originalPrice: MoneyType
    /**
     * 邮费
     */
    public postage: MoneyType

    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number
}
