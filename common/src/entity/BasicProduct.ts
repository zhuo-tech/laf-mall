import { LogicDelete } from '../constant'
import { IntegralEntity } from './Entity'

/**
 * <h2>基础商品信息</h2>
 * - 除非明确指定, 否则所有字段不可为空(null/undefined); 默认使用无意义默认值填充;
 * - 支持逻辑删除
 *
 * <h3>热门字段</h3>
 * - 库存: {@link stock} 规格产品明细库存变化时即时更新 {@link BasicSpecProduct.stock}
 * - 浏览量 {@link browseCount}
 *
 * <h3>备忘</h3>
 * - 注意各种活动标识
 * - 固定邮费迁移至规格信息中
 * - 多规格定义 见 {@link specType}
 *
 * @see BasicProductCategory
 * @see MallConfig
 * @see BasicSpecProduct
 *
 * TODO: 小程序分享二维码 (code_path); 分销/分佣 暂未定义
 *
 * @author 冰凝
 * @date 2022-06-20 下午 01:22
 **/
export class BasicProduct implements IntegralEntity {
    public static readonly NAME = 'basic_product'

    public _id: string
    /**
     * 所属分类
     * @see BasicProductCategory._id
     */
    public categoryId: string
    /**
     * 栏目ID
     * @see MallConfigKey.HOMEPAGE_CHANNEL
     * @see HomePageChannel
     * @see MallConfig._id
     */
    public channelId: string
    /**
     * 二级栏目ID
     * @see HomePageChannel
     */
    public channelValue: string

    /**
     * 商品名称
     */
    public name: string
    /**
     * 简介
     */
    public info: string
    /**
     * 商品标签
     */
    public tags: Array<ProductTag>
    /**
     * 关键字
     */
    public keyword: Array<string>
    /**
     * 封面图
     */
    public cover: string
    /**
     * 轮播图
     */
    public carousel: Array<string>
    /**
     * 产品描述, 即详情页
     * @apiNote: 应该是富文本
     */
    public desc: string

    /* ↑ 基础信息 */
    /**
     * 单位
     * 规格: 个 / 箱 / 瓶 / 只 / 套 等
     */
    public format: string
    /**
     * 规格类型: 单规格/多规格 <br>
     * 无论何种规格, 都应把库存, 金额 等保存在规格信息{@link BasicSpecProduct}中; <br>
     * 单规格可以保持 {@link BasicSpecProduct.specGroupId} {@link BasicSpecProduct.specName} 为空 (空字符串), 且只能有一条记录
     */
    public specType: SpecType
    /**
     * 排序优先级 (按 sort 升序)
     */
    public sort: number
    /**
     * 虚拟销量
     */
    public virtualSales: number
    /**
     * 浏览量
     */
    public browseCount: number

    /* ↑ 规格(单位), 金额, 库存等属性 */

    /**
     * 上架?
     * true 是
     */
    public onTheShelf: boolean

    public createBy: string
    public createTime: number
    public isDelete: LogicDelete
    public updateBy: string
    public updateTime: number
}

/**
 * 商品标签
 */
export interface ProductTag {
    label: string
}

/**
 * 规格类型
 */
export enum SpecType {
    /**
     * 单规格
     */
    SingleSpec = 0,
    /**
     * 多规格
     */
    MultipleSpec = 1,
}
