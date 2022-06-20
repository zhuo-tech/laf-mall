<script lang="ts" setup>
import { ShowImage } from '@/components/Show/ShowImage'

/**
 * ShowImage
 * @author 冰凝
 * @date 2022-06-15 下午 9:37 星期三
 */
const props = defineProps<{ src?: string | Array<string> }>()
const {srcArr} = new ShowImage(props)
</script>

<template>
<div class="show-image-wrapper" v-bind="$attrs">
    <img v-for="(src, index) in srcArr" :key="index" :alt="src" :src="src" v-bind="$attrs">
</div>
</template>
<style lang="sass" scoped>
</style>
