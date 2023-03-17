<script lang="ts" setup>
import Header from '@/components/Layout/components/header.vue'
import { ref } from 'vue'
import Aside from './components/Aside.vue'
import TopHeader from './components/header.vue'

const isMenuCollapsed = ref(false)
const isMenuHidden = ref(false)
window.addEventListener('resize', (ev) => {
    const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
    isMenuCollapsed.value = clientWidth < 1024
})
</script>

<template>
<main class="layout">
    <!-- 页眉 -->
    <header class="border-b-2">
        <top-header />
    </header>

    <el-row class="body flex">
        <!-- 侧边栏 -->
        <el-col :lg="3" :sm="3" :xl="2" :xs="3" class="aside hidden sm:block overflow-x-hidden">
            <Transition>
                <Aside v-if="!isMenuHidden" :collapse="isMenuCollapsed" />
            </Transition>
        </el-col>

        <!-- 路由视图 -->
        <el-col :lg="21" :sm="21" :xl="22" :xs="21" class="page-wrapper flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 sm:p-4 p-2">
            <router-view v-slot="{ Component }">
                <transition appear mode="out-in" name="el-fade-in">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
        </el-col>
    </el-row>
</main>
</template>

<style lang="sass" scoped>
.layout
    --layout-height: 100vh
    --layout-header-height: 60px
    --layout-main-height: calc(var(--layout-height) - var(--layout-header-height))

.layout
    height: var(--layout-height)

    > header
        height: var(--layout-header-height)

    .body
        height: var(--layout-main-height)
        overflow: auto

        > *
            overflow: auto
            height: 100%

        .aside
            position: relative

            .collapse-btn
                position: absolute
                width: 20px
                height: 30px
                background-color: white
                top: 40%
                left: 100%
                z-index: 999
                cursor: pointer
                transition: all 0.2s ease-in-out 0s


            .collapse-btn:hover
                background-color: lightgray

    .v-enter-active,
    .v-leave-active
        transition: width 0.2s ease

    .v-enter-from,
    .v-leave-to
        width: 0
        opacity: 0

</style>
