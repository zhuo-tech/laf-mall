<script lang="ts" setup>
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
<div class="layout">
    <!-- 页眉 -->
    <div class="header border-b-2">
        <top-header />
    </div>

    <el-row class="main flex">
        <!-- 侧边栏 -->
        <el-col :lg="3" :sm="3" :xl="2" :xs="3" class="menu hidden sm:block overflow-x-hidden">
            <Transition>
                <Aside v-if="!isMenuHidden" :collapse="isMenuCollapsed" />
            </Transition>
        </el-col>

        <!-- 路由视图 -->
        <el-col :lg="21" :sm="21" :xl="22" :xs="21" class="page flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 sm:p-4 p-2">
            <router-view v-slot="{ Component }">
                <transition appear mode="out-in" name="el-fade-in">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
        </el-col>
    </el-row>
</div>
</template>

<style lang="sass" scoped>
.layout
    --layout-height: 100vh
    --layout-header-height: 60px
    --layout-main-height: calc(var(--layout-height) - var(--layout-header-height))

.layout
    height: var(--layout-height)

    .header
        height: var(--layout-header-height)

    .main
        height: var(--layout-main-height)

        .menu
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
