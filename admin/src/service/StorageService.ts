import { TimeUnit } from '@es-tool/core'

/**
 * 会话存储 <br>
 * 虽然 setAttribute  getAttribute  removeAttribute 都拥有 key 的类型提示;
 * 但是基于谁保存(set) 谁提供(get) 的原则, 不推荐页面直接从这里取值
 * @author LL
 * @date 2022-01-20 下午 8:31
 **/
export interface StorageService {
    /**
     * 设置一个属性
     * @param  key 属性名
     * @param  value 属性值
     * @param level {StorageLevel} 保存等级, 默认最低级别 {@link StorageLevel.RAM}
     * @param time {number} 可选, 持久化时间; 默认值 {@link StorageWrapper.DEFAULT_TIME}
     */
    setAttribute<K extends keyof StorageRegister>(key: K, value: StorageRegister[K]['value'], level: StorageLevel, time?: number): void

    /**
     * 获取一个属性
     * @param  key 属性名
     * @param  level 建议搜索的存储等级, 可选; 默认搜索所有保存区域
     */
    getAttribute<K extends keyof StorageRegister>(key: K, level?: StorageLevel): StorageRegister[K]['value'] | null

    /**
     * 移除一个属性
     * @param  key
     */
    removeAttribute<K extends keyof StorageRegister>(key: K): void
}

/**
 * 注册表
 * key -> value 类型 注册
 */
export type StorageRegister = {
    /**
     * 登录用户 token
     */
    token: StorageWrapper<string>,
    /**
     * 登录用户信息
     */
    userInfo: StorageWrapper<Record<string, any>>
}

/**
 * 存储级别
 */
export enum StorageLevel {
    /**
     * 最低等级, 仅保存在内存, 页面刷新后丢失
     * @type {StorageLevel.RAM}
     */
    RAM = 1,
    /**
     * 会话等级, 在浏览器关闭后丢失
     * @type {StorageLevel.SESSION}
     */
    SESSION = 10,
    /**
     * 持久化, 最高等级; 除非指定超时过期或主动删除, 否则永不丢失
     * @type {StorageLevel.PERSISTENCE}
     */
    PERSISTENCE = 100
}

/**
 * 保存数据的包装
 */
export class StorageWrapper<T = any> {
    /**
     * 默认超时时间, 一周的毫秒值
     */
    public static readonly DEFAULT_TIME: number = TimeUnit.WEEK.toMillis(1)
    /**
     * 存储key
     */
    key: string
    /**
     * 值
     */
    value: T
    /**
     * 值经过 typeof 预算的结果
     */
    type: string
    /**
     * 超时时间
     */
    time: number

    /**
     * 构建一个新对象, 应用默认超时(如果未指定)
     * @param  key key
     * @param data 数据
     * @param  time 超时 可选
     * @return {StorageWrapper<any>} 新包装对象
     */
    public static build<T>(key: string, data: T, time?: number): StorageWrapper<T> {
        const wrapper = new StorageWrapper()
        wrapper.key = key
        wrapper.value = data
        wrapper.type = typeof data
        wrapper.time = (time ?? StorageWrapper.DEFAULT_TIME) + Date.now()
        return wrapper
    }

    /**
     * 应用超时规则
     */
    public static getNoTimeoutValue<T>(wrapper: StorageWrapper<T>): T | null {
        if (!wrapper) {
            return null
        }
        return wrapper.time < Date.now() ? null : wrapper.value
    }
}
