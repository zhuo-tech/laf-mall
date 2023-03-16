<template>
<!--suppress JSValidateTypes -->
<el-page-header :icon="ArrowLeft" @back="$router.go(-1)">
    <template v-slot:content>
        {{ title }}
    </template>
    <template #breadcrumb>
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="route in matched" :key="route.path" :to="route.path" replace>
                {{ route.meta.title || route.name || route.path }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </template>
    <template #extra>
        <slot name="extra"></slot>
    </template>
</el-page-header>
</template>

<script lang="ts" setup>
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { ArrayTool, ObjectTool, StrTool } from '@es-tool/core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 路由匹配
const matched = computed(() => useRoute().matched.filter(i => ObjectTool.isNotEmpty(i.meta)))
// 页面标题
const title = computed(() => {
    if (ArrayTool.isEmpty(matched.value)) {
        return StrTool.EMPTY
    }
    const [ , last ] = matched.value

    return last?.meta.title || last?.name || StrTool.EMPTY
})
</script>
