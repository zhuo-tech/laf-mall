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
    HOMEPAGE_CHANNEL = '首页栏目',
    HOMEPAGE_MENU = '首页菜单',
    HOMEPAGE_HOT = '热门搜索',
    PERSONAL_CENTER = '个人中心',
    SECKILL_TIME_PERIOD = '秒杀时间段'
}

/**
 * 系统配置值类型映射
 */
export interface MallConfigKeyMapping {
    [MallConfigKey.HOMEPAGE_CAROUSEL]: HomePageCarousel
    [MallConfigKey.HOMEPAGE_ADVERTISING]: HomePageCarousel
    [MallConfigKey.HOMEPAGE_CHANNEL]: HomePageChannel
    [MallConfigKey.HOMEPAGE_ADVERTISING]: HomePageCarousel
    [MallConfigKey.HOMEPAGE_MENU]: Menu
    [MallConfigKey.HOMEPAGE_HOT]: Hot
    [MallConfigKey.PERSONAL_CENTER]: Personal
    [MallConfigKey.SECKILL_TIME_PERIOD]: SeckillTimePeriod
}

/**
 * 轮播图 / 广告图
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

/**
 * 首页菜单
 */
export class Menu {
    /**
     * 菜单名称
     * @type {string}
     */
    public name: string
    /**
     * 封面图
     * @type {string}
     */
    public cover: string
    /**
     * uniapp地址
     * @type {string}
     */
    public uniUrl: string
    /**
     * pc端地址
     * @type {string}
     */
    public pcUrl: string
    /**
     * 排序
     * @type {number}
     */
    public sort: number
    /**
     * 状态
     * @type {boolean}
     */
    public status: boolean
}

/**
 * 热门搜索
 */
export class Hot {
    /**
     * 标签
     * @type {string}
     */
    public tag: string
    /**
     * 排序
     * @type {number}
     */
    public sort: number
    /**
     * 状态
     * @type {boolean}
     */
    public status: boolean
}

/**
 * 个人中心
 */
export class Personal {
    /**
     * 菜单名称
     */
    public name: string
    /**
     * 移动端图标
     */
    public uniIcon: string
    /**
     * 网页端图标
     */
    public pcIcon: string
    /**
     * uniapp 地址
     */
    public uniUrl: string
    /**
     * pc端地址
     */
    public pcUrl: string
    /**
     * 排序
     */
    public sort: number
    /**
     * 状态
     */
    public status: boolean
}

/**
 * 首页栏目
 */
export class HomePageChannel {
    /**
     * 排序优先级
     */
    public sort: number
    /**
     * 显示用名称
     */
    public name: string
}

/**
 * 秒杀时间段
 */
export class SeckillTimePeriod {
    /**
     * 开始时间: 时 分 秒
     */
    public start: string
    /**
     * 持续时间: 时分秒
     */
    public length: string
}
