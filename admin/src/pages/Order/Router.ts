import Layout from '@/components/Layout/index.vue'
import { ShoppingCartFull } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

/**
 * Router
 * @author 冰凝
 * @date 2022-06-14 下午 05:31
 **/
const RouterConfig: RouteRecordRaw = {
    path: '/order',
    redirect: '/order/list',
    component: Layout,
    children: [
        {
            path: 'list',
            component: () => import('./Order.vue'),
            meta: {
                isMenu: true,
                title: '订单管理',
                icon: ShoppingCartFull,
            },
        },
    ],
}

export default RouterConfig
