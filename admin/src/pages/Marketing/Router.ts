import Layout from '@/components/Layout/index.vue'
import { VueRouter } from '@/main'
import { ShoppingCartFull, Ticket, Timer, TrendCharts } from '@element-plus/icons-vue'
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
        icon: TrendCharts,
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
            path: 'seckill/create',
            component: () => import('./Seckill/Seckill.vue'),
            meta: {
                isMenu: false,
                title: '新增秒杀活动',
            },
        },
        {
            path: 'seckill/update/:id',
            component: () => import('./Seckill/Seckill.vue'),
            meta: {
                isMenu: false,
                title: '编辑秒杀活动',
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
            path: 'group/create',
            component: () => import('./Seckill/Seckill.vue'),
            meta: {
                isMenu: false,
                title: '新增拼团活动',
            },
        },
        {
            path: 'group/update/:id',
            component: () => import('./Seckill/Seckill.vue'),
            meta: {
                isMenu: false,
                title: '编辑拼团活动',
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
            path: 'bargain/create',
            component: () => import('./Bargain/BargainEditor.vue'),
            meta: {
                isMenu: false,
                title: '新增砍价活动',
            },
        },
        {
            path: 'bargain/update/:id',
            component: () => import('./Bargain/BargainEditor.vue'),
            meta: {
                isMenu: false,
                title: '编辑砍价活动',
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

// noinspection JSIgnoredPromiseFromCall
export class MarketingRouterControl {

    public static toSeckill() {
        VueRouter.push('/marketing/seckill')
    }

    public static toSeckillCreate() {
        VueRouter.push('/marketing/seckill/create')
    }

    /**
     * @param id {@link MallActivitySeckill._id}
     */
    public static toSeckillUpdate(id: string) {
        VueRouter.push('/marketing/seckill/update/' + id)
    }

    public static toGroup() {
        VueRouter.push('/marketing/group')
    }

    public static toGroupCreate() {
        VueRouter.push('/marketing/group/create')
    }

    /**
     * @param id {@link MallActivityGroup._id}
     */
    public static toGroupUpdate(id: string) {
        VueRouter.push('/marketing/group/update/' + id)
    }

    public static toBargain() {
        VueRouter.push('/marketing/bargain')
    }

    public static toBargainCreate() {
        VueRouter.push('/marketing/bargain/create')
    }

    /**
     * @param id {@link MallActivityBargain._id}
     */
    public static toBargainUpdate(id: string) {
        VueRouter.push('/marketing/bargain/update/' + id)
    }

}
