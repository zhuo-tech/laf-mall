import App from '@/App'
import '@/config/LafConfig'
import { RoutingProvider } from '@/config/RouterConfig'
import * as ElIconModules from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './style/element/index.css'

// 在 element-plus css 之前导入 tailwind css 以避免冲突
import './style/index.css'

export const app = createApp(App)
export const VueRouter = new RoutingProvider().instant

app.use(VueRouter)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app')

Object.values(ElIconModules).forEach(icon => app.component(icon.name, icon))
