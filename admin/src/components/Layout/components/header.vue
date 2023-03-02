<script lang="ts" setup>
import Aside from '@/components/Layout/components/Aside.vue'
import { StorageServiceImpl } from '@/service/impl/StorageServiceImpl'
import { StorageService } from '@/service/StorageService'
import { useUserStore } from '@/store/user'
// @ts-ignore
import { Expand } from '@element-plus/icons-vue'
import { ref } from 'vue'

const isOpenMenu = ref(false)

function switchOpenMenu() {
    isOpenMenu.value = !isOpenMenu.value
}

const user = useUserStore()

function exit() {
    const service: StorageService = new StorageServiceImpl()
    service.removeAttribute('token')
    location.reload()
}
</script>

<template>
    <div class="flex w-full h-full items-center">
        <div class="brand w-40 flex items-center justify-start ml-2">
            <img alt="logo" class="w-8 h-8 align-middle" src="/logo.jpg" />
            <div class="brand-text sm:block ml-2">商城</div>
        </div>
        <div class="menu flex-auto sm:flex justify-end hidden">
            <el-menu :ellipsis="false" default-active="0" mode="horizontal">
                <el-sub-menu index="quit">
                    <template #title>
                        <el-avatar :size="50" :src="user.avatar" fit="cover" shape="square"></el-avatar>
                        <span style="padding-left: 10px">{{ user.username }}</span>
                    </template>
                    <el-menu-item index="exit" @click="exit()">
                        <el-icon>
                            <circle-close />
                        </el-icon>
                        退出
                    </el-menu-item>
                </el-sub-menu>

            </el-menu>
        </div>
        <div class="menu flex-auto flex justify-end sm:hidden mr-2">
            <el-button :icon="Expand" plain @click="switchOpenMenu"></el-button>
        </div>
        <el-drawer
            v-model="isOpenMenu"
            :with-header="false"
            modal-class="layout-header-drawer-hack"
            size="160px">
            <Aside @select="isOpenMenu = false" />
        </el-drawer>
    </div>
</template>

<style lang="less">
.layout-header-drawer-hack .el-drawer .el-drawer__body {
    padding: 0 !important;
}
</style>
