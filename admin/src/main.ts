import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElIconModules from '@element-plus/icons-vue'
import App from '@/App'
import { RoutingProvider } from '@/config/RouterConfig'
import '@/config/LafConfig'

// 在 element-plus css 之前导入 tailwind css 以避免冲突
import './style/index.css'
import 'element-plus/dist/index.css'
import './style/element/index.css'

export const app = createApp(App)
export const VueRouter = new RoutingProvider().instant

app.use(VueRouter)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app')

Object.values(ElIconModules).forEach(icon => app.component(icon.name, icon))
