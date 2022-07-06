import Layout from '@/components/Layout/index.vue'
import { Document, FolderOpened } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

/**
 * Router
 * @author 冰凝
 * @date 2022-06-14 下午 05:31
 **/
const RouterConfig: RouteRecordRaw = {
    path: '/config',
    redirect: '/config/menu',
    component: Layout,
    meta: {
        title: '商城配置',
        icon: Document,
    },
    children: [
        {
            path: 'menu',
            component: () => import('./Menu/Menu.vue'),
            meta: {
                isMenu: true,
                title: '首页菜单',
                icon: FolderOpened,
            },
        },
        {
            path: 'hot',
            component: () => import('./Hot/Hot.vue'),
            meta: {
                isMenu: true,
                title: '热门搜索',
                icon: FolderOpened,
            },
        },
        {
            path: 'personal',
            component: () => import('./Personal/Personal.vue'),
            meta: {
                isMenu: true,
                title: '个人中心',
                icon: FolderOpened,
            },
        },
    ],
}

export default RouterConfig
