import { StrUtil } from 'typescript-util'

import {
    createRouter,
    createWebHistory,
    NavigationGuard,
    NavigationGuardWithThis,
    NavigationHookAfter,
    RouteLocationNormalized,
    RouteLocationNormalizedLoaded,
    Router,
    RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: () => import('@/pages/Home/Home.vue'),
    }
]

export function createVueRouterInstantiate(): Router {
    const instantiate = createRouter({
        history: createWebHistory(),
        routes,
    })
    const log = console

    /**
     * 导航之前, 处理登录状态判断
     * @param {RouteLocationNormalized} to 目标路由
     * @param {RouteLocationNormalized} from 来源路由
     * @param next 必须调用
     */
    const beforeEach: NavigationGuard = (to, from, next) => {
        console.groupCollapsed('Router')
        log.trace('导航之前: ', from.path, ' => ', to.path)

        // 前往登录页
        next()
    }

    const afterEach: NavigationHookAfter = (to, from) => {
        log.trace('导航完成: ', from.path, ' => ', to.path)
        console.groupEnd()
        const MAX_SHOW_DEEP = 5
        const title = to.matched.map(({meta, name}) => meta?.title || name)
            .filter(str => StrUtil.isNotEmpty(str as string))
            .reverse()
            .filter((s, i) => i <= MAX_SHOW_DEEP)
            .join(' - ')

        if (StrUtil.isNotEmpty(title)) {
            document.title = `${ title }`
            // TODO: 缺一个站点名称
            // document.title = `${title} - ${site_name}`
        }
    }

    const beforeResolve: NavigationGuardWithThis<any> = () => {

    }

    instantiate.onError((error: any, to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded): any => {
        console.groupEnd()
        log.error('导航错误', from.path, ' => ', to.path, error)
    })

    instantiate.afterEach(afterEach)
    instantiate.beforeEach(beforeEach)
    instantiate.beforeResolve(beforeResolve)

    return instantiate
}
