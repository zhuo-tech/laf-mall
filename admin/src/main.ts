import App from '@/App.vue'
import '@/config/LafConfig'
import { RoutingProvider } from '@/config/RouterConfig'
import * as ElIconModules from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

export const app = createApp(App)
export const VueRouter = new RoutingProvider().instant

app.use(VueRouter)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app')

Object.values(ElIconModules).forEach(icon => app.component(icon.name, icon))
