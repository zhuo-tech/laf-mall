<script lang="tsx">
import { ConfigProviderProps } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent } from 'vue'

export default defineComponent({
    computed: {
        config(): Partial<ConfigProviderProps> {
            return {
                locale: zhCn,
                size: 'small',
                keyboardNavigation: true,
                button: { autoInsertSpace: true },
                message: { max: 10 },
            }
        },
    },
    render() {
        return (
            <el-config-provider { ...this.config }>
                <router-view></router-view>
            </el-config-provider>
        )
    },
})
</script>

<style lang="sass">
@import "./style/index.css"
// 在 element-plus css 之前导入 tailwind css 以避免冲突
@import "element-plus/dist/index.css"
@import "./style/element/index.css"
</style>
