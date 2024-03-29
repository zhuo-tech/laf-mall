import Admin from '@/pages/Admin/Router'
import Basic from '@/pages/Basic/Router'
import MallConfig from '@/pages/Config/Router'
import Error from '@/pages/Error/Router'
import Home from '@/pages/Home/Router'
import Login from '@/pages/Login/Router'
import Marketing from '@/pages/Marketing/Router'
import Order from '@/pages/Order/Router'
import { StorageServiceImpl } from '@/service/impl/StorageServiceImpl'
import { StorageService } from '@/service/StorageService'
import { useUserStore } from '@/store/user'
import { StrTool } from '@es-tool/core'
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
    // 无需授权页面
    Login,

    // 需要登录
    Home,
    Basic,
    Order,
    Marketing,
    MallConfig,
    Admin,

    // 兜底
    ...Error,
]

export class RoutingProvider {
    public instant: Router
    private log = console
    private readonly storageService: StorageService = new StorageServiceImpl()

    constructor() {
        const instantiate = createRouter({
            history: createWebHistory(),
            routes,
        })

        instantiate.onError(this.onError)
        instantiate.afterEach(this.afterEach)
        instantiate.beforeEach(this.beforeEach)
        instantiate.beforeResolve(this.beforeResolve)

        this.instant = instantiate
    }

    /**
     * 导航之前, 处理登录状态判断
     * @param {RouteLocationNormalized} to 目标路由
     * @param {RouteLocationNormalized} from 来源路由
     * @param next 必须调用
     */
    private beforeEach: NavigationGuard = (to, from, next) => {
        this.log.debug('导航之前: ', from.path, ' => ', to.path)
        const logged = StrTool.isNotEmpty(this.storageService.getAttribute('token') as string)

        // 前往登录页
        if (to.path === '/login') {
            return logged ? next('/') : next()
        }

        if (logged) {
            useUserStore().init()
            return next()
        } else {
            return next('login')
        }
    }

    private afterEach: NavigationHookAfter = (to, from) => {
        this.log.debug('导航完成: ', from.path, ' => ', to.path)
        const MAX_SHOW_DEEP = 5
        const title = to.matched.map(({ meta, name }) => meta?.title || name)
            .filter(str => StrTool.isNotEmpty(str as string))
            .reverse()
            .filter((s, i) => i <= MAX_SHOW_DEEP)
            .join(' - ')

        if (StrTool.isNotEmpty(title)) {
            document.title = `${ title }`
            // TODO: 缺一个站点名称
            // document.title = `${title} - ${site_name}`
        }
    }

    private beforeResolve: NavigationGuardWithThis<any> = () => {

    }

    private onError = (error: any, to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded): any => {
        this.log.error('导航错误', from.path, ' => ', to.path, error)
    }

}
