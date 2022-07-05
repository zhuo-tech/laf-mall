import Layout from '@/components/Layout/index.vue'
import { Document, FolderOpened, ShoppingBag, Film, PictureFilled } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

/**
 * Router
 * @author 冰凝
 * @date 2022-06-14 下午 05:31
 **/
const RouterConfig: RouteRecordRaw = {
    path: '/basic',
    redirect: '/basic/category',
    component: Layout,
    meta: {
        title: '基础信息',
        icon: Document,
    },
    children: [
        {
            path: 'category',
            component: () => import('./Category/Category.vue'),
            meta: {
                isMenu: true,
                title: '商品分类',
                icon: FolderOpened,
            },
        },
        {
            path: 'product',
            component: () => import('./Product/Product.vue'),
            meta: {
                isMenu: true,
                title: '商品管理',
                icon: ShoppingBag,
            },
        },
        {
            path: 'carousel',
            component: () => import('./Carousel/Carousel.vue'),
            meta: {
                isMenu: true,
                icon: Film,
                title: '首页轮播',
            },
        },
        {
            path: 'ads',
            component: () => import('./Ads/Ads.vue'),
            meta: {
                isMenu: true,
                icon: PictureFilled,
                title: '首页广告',
            },
        },
    ],
}

export default RouterConfig
