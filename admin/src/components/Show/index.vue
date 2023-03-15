<script lang="ts" setup>
import { ShowImage } from '@/components/Show/ShowImage'
import { Picture } from '@element-plus/icons-vue'

/**
 * ShowImage
 * @author 冰凝
 * @date 2022-06-15 下午 9:37 星期三
 */
const props = defineProps<{ src?: string | Array<string> }>()
const { srcArr } = new ShowImage(props)
</script>

<template>
<div class="show-image-wrapper" v-bind="$attrs">
    <el-image
        v-for="(src, index) in srcArr"
        :key="index"
        :alt="src"
        :previewSrcList="srcArr"
        :src="src"
        preview-teleported
        v-bind="$attrs"
    >
        <div class="image-slot">
            <el-icon>
                <Picture />
            </el-icon>
        </div>
    </el-image>
</div>
</template>
<style lang="sass" scoped>
</style>
