import { BeanScope } from './BeanScope'

// noinspection JSUnusedGlobalSymbols
/**
 * ApplicationContext
 * @author 冰凝
 * @date 2022-06-14 下午 06:29
 **/
export class ApplicationContext {
    private container: Map<string, BeanInfo> = new Map<string, BeanInfo>()

    /**
     * 注册一个Bean
     * @param o 包装实例
     */
    public registered(o: BeanInfo) {
        this.container.set(o.name, o)
    }

    /**
     * 根据指定类型获取一个 Bean
     * @param name 类型名
     */
    public getBean<T = any>(name: string): T {
        // @ts-ignore
        return this.container.get(name)?.getInstance()
    }
}

/**
 * {@link Component} 定义的实现, 包装器
 */
export class BeanInfo {
    private readonly _name: string
    /**
     * 类定义, 准确的说是装饰器获取到的构造器对象
     */
    private readonly target: any
    private readonly scope: BeanScope
    /**
     * 实例对象缓存
     */
    private instance: object | null = null

    constructor(name: string, target: any, scope: BeanScope) {
        this._name = name
        this.target = target
        this.scope = scope
    }

    public get name(): string {
        return this._name
    }

    public getInstance(): object | null {
        if (this.scope === BeanScope.SINGLETON) {
            if (this.instance == null) {
                this.instance = new this.target()
            }
            return this.instance!
        }
        if (this.scope === BeanScope.PROTOTYPE) {
            return new this.target()
        }
        return null
    }

}
