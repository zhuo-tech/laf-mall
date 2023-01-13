<script lang="ts" setup>
// @ts-ignore
import { ArrowLeft } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

/**
 * FormPage
 * @author 冰凝
 * @date 2022-07-11 13:19:22
 **/
defineProps<{
    title?: string
}>()
const matched = computed(() => useRoute().matched)
</script>

<template>
<el-card>
    <!-- 页眉 -->
    <template v-slot:header>
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

    <!-- 内容区 -->
    <el-row>
        <el-col :lg="22" :md="24" :xl="20">
            <slot name="default"></slot>
        </el-col>
    </el-row>

    <!--   页脚  -->
    <slot name="footer">
    </slot>
</el-card>
</template>

<style lang="sass" scoped>
.header-bread-crumbs
    margin-top: 5px
</style>
