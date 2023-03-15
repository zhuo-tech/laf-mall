import App from '@/App.vue'
import '@/config/LafConfig'
import { RoutingProvider } from '@/config/RouterConfig'
import * as ElIconModules from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

createApp(App)
    .use(new RoutingProvider().instant)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app')

Object.values(ElIconModules).forEach(icon => createApp(App).component(icon.name, icon))
