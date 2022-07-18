<script lang="ts" setup>
import { BasicRouterControl } from '@/pages/Basic/Router'
import { computed } from '@vue/runtime-core'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

/**
 * 产品详情
 * @author 冰凝
 * @date 2022-07-08 上午 10:19
 **/
const route: RouteLocationNormalizedLoaded = useRoute()
const productId = computed(() => <string>route.params.id)

</script>

<template>
<div>
    <h1>商品详情页 只读</h1>

    <el-button @click="BasicRouterControl.toProductUpdate(productId)"> 编辑</el-button>
</div>
</template>

<style lang="sass" scoped>
</style>
