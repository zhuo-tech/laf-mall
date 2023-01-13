import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from 'path'
import { defineConfig } from 'vite'

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
    ],
    server: {
        port: 80,
    },
    envDir: './env',
    resolve: {
        alias: {
            '@': join(__dirname, 'src'),
        },
    },
})
