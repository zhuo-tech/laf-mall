import Layout from '@/components/Layout/index.vue'
import { Check, Collection, Setting, User } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

/**
 * Router
 * @author 冰凝
 * @date 2022-06-14 下午 05:31
 **/
const RouterConfig: RouteRecordRaw = {
    component: Layout,
    path: '/admin',
    meta: {
        title: '系统管理',
        icon: Setting,
    },
    children: [
        {
            path: 'permission',
            component: () => import('./Permission/Permission.vue'),
            meta: {
                isMenu: true,
                title: '权限管理',
                icon: Check,
            },
        },
        {
            path: 'role',
            component: () => import('./Role/Role.vue'),
            meta: {
                isMenu: true,
                title: '角色管理',
                icon: Collection,
            },
        },
        {
            path: 'user',
            component: () => import('./User/User.vue'),
            meta: {
                isMenu: true,
                title: '用户管理',
                icon: User,
            },
        },

    ],
}

export default RouterConfig
