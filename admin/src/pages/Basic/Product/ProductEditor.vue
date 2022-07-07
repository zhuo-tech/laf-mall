<script lang="ts" setup>
import { BasicRouterControl } from '@/pages/Basic/Router'
import { computed } from '@vue/runtime-core'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

/**
 * ProductForm
 * @author 冰凝
 * @date 2022-07-07 下午 06:10
 **/
const route: RouteLocationNormalizedLoaded = useRoute()

const productId = computed(() => route.params.id)
const isEdit = computed(() => !!productId.value)

</script>

<template>
<div>
    <h1>商品编辑页</h1>
    <div>参数: {{ $route.params }}</div>
    <div>路径: {{ $route.path }}</div>
    <div>完整路径: {{ $route.fullPath }}</div>

    <div>是编辑页面? {{ isEdit }}</div>
    <div>商品ID: {{ productId }}</div>

    <el-button @click="BasicRouterControl.toProduct()">回去</el-button>
</div>
</template>

<style lang="sass" scoped>
</style>
