<template>
<!--suppress JSValidateTypes -->
<el-page-header :icon="ArrowLeft" content="detail" @back="$router.go(-1)">
    <template v-slot:title>
        {{ title }}
    </template>
    <template v-slot:content>
        <div class="header-bread-crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="route in matched" :key="route.path" :to="route.path">
                    {{ route.meta.title || route.name || route.path }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </template>
</el-page-header>
</template>

<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { ArrayTool, StrTool } from '@es-tool/core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 路由匹配
const matched = computed(() => useRoute().matched)
// 页面标题
const title = computed(() => {
    if (ArrayTool.isEmpty(matched.value)) {
        return StrTool.EMPTY
    }
    const [ , last ] = matched.value

    return last?.meta.title || StrTool.EMPTY
})
</script>

<style lang="sass" scoped>
.header-bread-crumbs
    margin-top: 5px
</style>
