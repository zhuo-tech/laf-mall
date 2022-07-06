
import { defineConfig } from "vite"
import uni from "@dcloudio/vite-plugin-uni"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  server: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'https://3dgrfj.lafyun.com',
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp('^' + process.env.VUE_APP_BASE_API), '')
      },
    }
  }

})

module.exports = {
  transpileDependencies: ['@dcloudio/uni-ui']
}
