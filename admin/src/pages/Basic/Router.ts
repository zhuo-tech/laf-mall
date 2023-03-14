import { VueRouter } from '@/main'
import { Document, Film, FolderOpened, PictureFilled, ShoppingBag } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

/**
 * Router
 * @author 冰凝
 * @date 2022-06-14 下午 05:31
 **/
const RouterConfig: RouteRecordRaw = {
    path: '/basic',
    redirect: '/basic/category',
    component: () => import('@/components/Layout/index.vue'),
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
        {
            path: 'product/create',
            component: () => import('./Product/ProductEditor.vue'),
            meta: {
                isMenu: false,
                title: '新增商品',
            },
        },
        {
            path: 'product/update/:id',
            component: () => import('./Product/ProductEditor.vue'),
            meta: {
                isMenu: false,
                title: '编辑商品',
            },
        },
        {
            path: 'product/detail/:id',
            component: () => import('./Product/ProductDetails.vue'),
            meta: {
                isMenu: false,
                title: '商品详情',
            },
        },
    ],
}

// noinspection JSIgnoredPromiseFromCall
export class BasicRouterControl {

    public static toProduct() {
        VueRouter.push('/basic/product')
    }

    public static toProductCreate() {
        VueRouter.push('/basic/product/create')
    }

    /**
     * @param id {@link BasicProduct._id}
     */
    public static toProductUpdate(id: string) {
        VueRouter.push('/basic/product/update/' + id)
    }

    /**
     * @param id {@link BasicProduct._id}
     */
    public static toProductDetail(id: string) {
        VueRouter.push('/basic/product/detail/' + id)
    }
}

export default RouterConfig
