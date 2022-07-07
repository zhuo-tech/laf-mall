import { LogicDelete } from '../constant/LogicDelete'
import { IntegralEntity } from './Entity'

/**
 * <h2>抽象的营销活动</h2>
 *
 * - 除非明确指定, 否则所有字段不可为空(null/undefined); 默认使用无意义默认值填充;
 * - 支持逻辑删除
 *
 * 包含
 * - 活动基础信息
 * - 活动统计数据
 * - entity 管理属性
 *
 * <h3>备忘</h3>
 * - 成本价, 邮费, 取 {@link BasicSpecProduct.cost} {@link BasicSpecProduct.postage} 这里不额外保存;
 * - 包邮规则也继承自 {@link BasicSpecProduct}
 * - 不设自动开启开关, 所有活动 根据 {@link start} {@link stop} 自动开启和关闭
 *
 * - 需要维护浏览量和分享计数 {@link browseCount} {@link shareCount}
 *
 * @author 冰凝
 * @date 2022-07-06 下午 05:11
 */
export abstract class AbstractMallActivity<T> implements IntegralEntity {
    /**
     * 活动ID
     */
    public _id: string
    /**
     * 商品ID
     * @see BasicProduct._id
     */
    public productId: string
    /**
     * 活动标题
     */
    public title: string
    /**
     * 封面图
     */
    public cover?: string
    /**
     * 轮播图
     */
    public carousel?: Array<string>
    /**
     * 广告图
     */
    public ads?: Array<string>
    /**
     * 活动简介 纯文本
     */
    public info: string
    /**
     * 活动描述, 富文本
     */
    public desc: string
    /**
     * 活动规则
     */
    public rule: string

    /* ↑ 活动基础信息 */
    /**
     * 活动信息 -> 商品规格信息映射
     * - key: 规格ID {@link BasicSpecProduct._id}
     * - value: 不同活动所需的特殊属性
     */
    public detail: Record<string, T>

    /**
     * 活动开始时间
     */
    public start: number
    /**
     * 活动停止时间
     */
    public stop: number

    /**
     * 排序优先级 升序
     */
    public sort: number
    /**
     * 浏览量
     */
    public browseCount: number
    /**
     * 分享计数
     */
    public shareCount: number

    public createBy: string
    public createTime: number
    public isDelete: LogicDelete
    public updateBy: string
    public updateTime: number
}
