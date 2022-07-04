<script lang="ts" setup>

/**
 * Home
 * @date 2022-06-14 上午 11:50
 * @@author DNN
 **/

</script>

<template>
<div>
    <el-card class="grid-content" header="这是个标题">

    </el-card>
    <br>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-card class="grid-content" header="详情">

            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="grid-content" header="卡片">

            </el-card>
        </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="6">
            <el-card class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="6">
            <el-card class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6">
            <el-card class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="6">
            <el-card class="grid-content ep-bg-purple-light" />
        </el-col>
    </el-row>

</div>
</template>

<style lang="sass" scoped>
.el-row
    margin-bottom: 20px

.el-row:last-child
    margin-bottom: 0

.el-col
    border-radius: 4px

.grid-content
    border-radius: 4px
    min-height: 300px
</style>
