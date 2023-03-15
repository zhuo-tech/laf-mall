<script lang="ts" setup>

/**
 * Home
 * @date 2022-06-14 上午 11:50
 * @@author DNN
 **/

</script>

<template>
<div>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card class="grid-content" header="" shadow="hover">

            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="grid-content" header="" shadow="hover">

            </el-card>
        </el-col>
    </el-row>
    <br>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-card class="grid-content" header="" shadow="hover">

            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="grid-content" header="" shadow="hover">

            </el-card>
        </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="6">
            <el-card class="grid-content ep-bg-purple" shadow="hover" />
        </el-col>
        <el-col :span="6">
            <el-card class="grid-content ep-bg-purple-light" shadow="hover" />
        </el-col>
        <el-col :span="6">
            <el-card class="grid-content ep-bg-purple" shadow="hover" />
        </el-col>
        <el-col :span="6">
            <el-card class="grid-content ep-bg-purple-light" shadow="hover" />
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
