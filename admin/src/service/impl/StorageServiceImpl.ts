import { StorageLevel, StorageRegister, StorageService, StorageServiceKey, StorageWrapper } from '@/service/StorageService'
import { Component } from 'common'
import { Function, ObjectUtil, StrUtil } from 'typescript-util'

/**
 * RamSessionServiceImpl
 * @author LL
 * @date 2022-01-20 下午 8:38
 **/
@Component(StorageServiceKey)
export class StorageServiceImpl implements StorageService {
    private readonly KEY_PREFIX = ''
    private readonly log = console
    private readonly ram: Record<keyof StorageRegister, any> = {} as any
    private readonly session: WindowStorage = new WindowStorage(window.sessionStorage, this.KEY_PREFIX)
    private readonly local: WindowStorage = new WindowStorage(window.localStorage, this.KEY_PREFIX)
    private readonly actionCache: Record<StorageLevel, Function<keyof StorageRegister, any>>

    constructor() {
        if (ObjectUtil.isEmpty(this.actionCache)) {
            this.actionCache = {} as any
        }
        // 内存存储不应用超时规则
        this.actionCache[StorageLevel.RAM] = (key) => {
            const ram = this.ram[key]
            return ObjectUtil.isNotNull(ram) ? ram : null
        }
        this.actionCache[StorageLevel.SESSION] = (key) => {
            return this.getNotTimeoutStorage(this.session, key) as any
        }
        this.actionCache[StorageLevel.PERSISTENCE] = (key) => {
            return this.getNotTimeoutStorage(this.local, key) as any
        }
    }

    public setAttribute<K extends keyof StorageRegister>(key: K, value: StorageRegister[K]['value'], level: StorageLevel, time?: number): void {
        const l: StorageLevel = level ?? StorageLevel.RAM
        let wrapper = StorageWrapper.build(key, value, time)

        switch (l) {
            case StorageLevel.RAM:
                this.ram[key] = value
                return
            case StorageLevel.SESSION:
                this.session.set(wrapper)
                return
            case StorageLevel.PERSISTENCE:
                this.local.set(wrapper)
                return
            default:
                this.log.error('不支持的 StorageLevel', level, '保存数据失败')
        }
    }

    public getAttribute<K extends keyof StorageRegister>(key: K, level: StorageLevel): StorageRegister[K]['value'] | null {
        if (ObjectUtil.isNotNull(level)) {
            return this.actionCache[level](key)
        }
        for (let actionKv of ObjectUtil.toArray(this.actionCache)) {
            const data = actionKv.value(key)
            if (data !== null) {
                return data
            }
        }
        return null
    }

    public removeAttribute<K extends keyof StorageRegister>(key: K): void {
        delete this.ram[key]
        this.session.remove(key)
        this.local.remove(key)
    }

    /**
     * 应用超时规则, 从 {@link WindowStorage} 中取出数据
     * @param {WindowStorage} storage 存储器
     * @param {string} key key
     * @return {unknown}
     * @private
     */
    private getNotTimeoutStorage(storage: WindowStorage, key: string) {
        const wrapper = storage.get(key as any)
        if (wrapper === null) {
            return null
        }
        const data = StorageWrapper.getNoTimeoutValue(wrapper)
        if (data !== null) {
            return data
        }
        this.log.trace(`存储超时自动删除, 当前: ${ Date.now() } 存储超时: ${ wrapper?.time }`)
        storage.remove(key as any)
        return null
    }

}

/**
 * 对 {@link Storage} 的装饰, 保存/取出包装一层对象, 避免类型不一致
 * 额外提供一点工具方法
 * @see hasKey
 * @see isEmpty
 * @see getAll
 */
export class WindowStorage {
    private readonly storage: Storage
    private readonly keyPrefix: string

    constructor(storage: Storage, keyPrefix: string = StrUtil.EMPTY) {
        this.storage = storage
        this.keyPrefix = keyPrefix
    }

    /**
     * 保存
     * @param data
     */
    public set<T>(data: StorageWrapper<T>) {
        this.storage.setItem(this.keyPrefix + data.key, JSON.stringify(data))
    }

    /**
     * 取出
     */
    public get<K extends keyof StorageRegister>(key: K): StorageRegister[K] | null {
        const data = this.storage.getItem(this.keyPrefix + key)
        if (data === null || data === undefined) {
            return null
        }
        return JSON.parse(data)
    }

    /**
     * 删除
     * @param {keyof StorageRegister} key
     */
    public remove(key: keyof StorageRegister) {
        this.storage.removeItem(this.keyPrefix + key)
    }

    /**
     * 清空
     */
    public clear() {
        this.storage.clear()
    }

    /**
     * 判断
     * @param {string} key
     * @return {boolean}
     */
    public hasKey(key: string): boolean {
        return !!this.storage[this.keyPrefix + key]
    }

    /**
     * 是否为空
     * @return {boolean}
     */
    public isEmpty(): boolean {
        return this.storage.length <= 0
    }

    /**
     * 获取所有
     * @return {Record<string, any>}
     */
    public getAll(): Record<string, any> {
        const res: Record<string, any> = {}
        for (let i = 0; i < this.storage.length; i++) {
            let key = this.storage.key(i)
            // @ts-ignore
            res[key] = this.storage[key]
        }
        return res
    }
}
