import { ApplicationContext, BeanInfo } from './ApplicationContext'
import { BeanScope } from './BeanScope'

export const Context = new ApplicationContext()

/**
 * <h2>修饰一个类</h2>
 * 声明当前类是一个小组件
 * @param name
 * @param scope 指定 Bean 类型, 单例 | 原型; 默认 单例(作用域单例)
 */
export function Component(name: string, scope: BeanScope = BeanScope.SINGLETON): ClassDecorator {
    return (target: any) => Context.registered(new BeanInfo(name, target, scope))
}

/**
 * <h2>修饰属性 get 方法(访问器) </h2>
 * 声明指定类字段值从容器中返回; 根据入参 name 匹配; <br>
 * > 字段类型声明仅用于开发提示, 无法作为注入依据; <br>
 * @param key 需要注入的类型的 key, 同 Bean 声明的 name 对应; 推荐使用类型名字符串;
 */
export function Inject(key: string): MethodDecorator {
    return (target, name, desc) => {
        const oldGet = desc.get!
        desc.get = () => {
            const bean = Context.getBean(key)
            if (!!bean) {
                return bean
            } else {
                console.error(`不满足的依赖: ${ key } 位于属性: ${ String(name) }`, target, Context)
                return oldGet()
            }
        }
    }
}
