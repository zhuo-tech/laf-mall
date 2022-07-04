import { CanUpdateEntity } from '../entity/Entity'

/**
 * MallConfig
 * @author 冰凝
 * @date 2022-06-20 下午 02:36
 **/
export class MallConfig implements CanUpdateEntity {
    public static readonly NAME = 'mall_config'

    public _id: string
    /**
     * 配置项
     */
    public key: MallConfigKey
    /**
     * 值
     * @see MallConfigKeyMapping
     */
    public value: MallConfigKeyMapping[keyof MallConfigKeyMapping]
    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number
}

/**
 * 系统配置项 key
 */
export enum MallConfigKey {
    HOMEPAGE_CAROUSEL = '首页轮播图',
    HOMEPAGE_ADVERTISING = '首页广告图',
}

/**
 * 系统配置值类型映射
 */
export interface MallConfigKeyMapping {
    [MallConfigKey.HOMEPAGE_CAROUSEL]: HomePageCarousel,
    [MallConfigKey.HOMEPAGE_ADVERTISING]: HomePageCarousel
}

/**
 * 轮播图
 */
export class HomePageCarousel {
    /**
     * 排序优先级
     */
    public sort: number
    /**
     * 图片地址
     */
    public href: string
    /**
     * 跳转目标地址
     */
    public target: string

}
