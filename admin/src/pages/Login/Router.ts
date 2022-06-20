import { RouteRecordRaw } from 'vue-router'

/**
 * Router
 * @author 冰凝
 * @date 2022-06-14 下午 05:31
 **/
const RouterConfig: RouteRecordRaw = {
    path: '/login',
    meta: {
        title: '登录',
        isMenu: false,
    },
    component: () => import('./Login.vue'),
}

export default RouterConfig
