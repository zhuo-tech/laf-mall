<script lang="ts" setup>
import ShowImage from '@/components/Show/ShowImage.vue'
import { BasicProduct, formatDate } from 'common'

/**
 * ShowProduct
 * @author 冰凝
 * @date 2022-07-08 下午 04:43
 **/
defineProps<{ data?: BasicProduct }>()

</script>

<template>
<el-row>
    <el-col :lg="8" :md="8" :xl="8" :xm="12" :xs="24">
        <ShowImage :previewSrcList="data?.carousel" :src="data?.cover" style="height: 100px" />
    </el-col>
    <el-col :lg="16" :md="16" :xl="16" :xm="12" :xs="24">
        <div>{{ data?.name }}</div>
        <div>{{ data?.info }}</div>
        <div>
            <el-tag v-for="(tag, index) in data?.tags" :key="index">
                {{ tag?.label }}
            </el-tag>
        </div>
        <div>{{ formatDate(data?.createTime) }}</div>
    </el-col>
</el-row>
</template>

<style lang="sass" scoped>
</style>
