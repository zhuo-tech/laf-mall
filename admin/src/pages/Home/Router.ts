import Layout from '@/components/Layout/index.vue'
import { DataAnalysis } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

export const HOME_PATH = '/'
/**
 * Router
 * @author 冰凝
 * @date 2022-06-14 下午 05:31
 **/
const RouterConfig: RouteRecordRaw = {
    component: Layout,
    path: HOME_PATH,
    children: [
        {
            path: '',
            component: () => import('./Home.vue'),
            meta: {
                isMenu: true,
                title: '仪表盘',
                icon: DataAnalysis,
            },
        },
    ],
}

export default RouterConfig
