import Layout from '@/components/Layout/index.vue'
import { ShoppingCartFull, TrendCharts, Timer, Ticket } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

/**
 * Router
 * @author 冰凝
 * @date 2022-06-14 下午 05:31
 **/
const RouterConfig: RouteRecordRaw = {
    path: '/marketing',
    redirect: '/marketing/seckill',
    component: Layout,
    meta: {
        isMenu: true,
        title: '营销中心',
        icon: TrendCharts
    },
    children: [
        {
            path: 'seckill',
            component: () => import('./Seckill/Seckill.vue'),
            meta: {
                isMenu: true,
                title: '秒杀活动',
                icon: ShoppingCartFull,
            },
        },
        {
            path: 'seckill/time',
            component: () => import('./Seckill/SeckillTime.vue'),
            meta: {
                isMenu: true,
                title: '秒杀时间配置',
                icon: Timer,
            },
        },
        {
            path: 'group',
            component: () => import('./Group/Group.vue'),
            meta: {
                isMenu: true,
                title: '拼团活动',
                icon: ShoppingCartFull,
            },
        },
        {
            path: 'bargain',
            component: () => import('./Bargain/Bargain.vue'),
            meta: {
                isMenu: true,
                title: '砍价活动',
                icon: ShoppingCartFull,
            },
        },
        {
            path: 'coupon',
            component: () => import('./Coupon/Coupon.vue'),
            meta: {
                isMenu: true,
                title: '优惠券',
                icon: Ticket,
            },
        },
    ],
}

export default RouterConfig
