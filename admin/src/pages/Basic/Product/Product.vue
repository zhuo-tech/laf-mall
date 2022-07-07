<script lang="ts" setup>
import { BasicRouterControl } from '@/pages/Basic/Router'

/**
 * Product
 * @author 冰凝
 * @date 2022-06-20 下午 04:38
 **/

</script>

<template>
<el-card header="商品">
    <h1>
        ???????
    </h1>

    <el-button @click="BasicRouterControl.toProductCreate()">
        去新增页面
    </el-button>

    <el-button @click="BasicRouterControl.toProductUpdate('2333')">
        去编辑页面
    </el-button>
</el-card>
</template>

<style lang="sass" scoped>
</style>
