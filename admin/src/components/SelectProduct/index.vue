<!--suppress JSUnresolvedVariable -->
<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowProduct from '@/components/SelectProduct/components/ShowProduct.vue'
import { SelectProduct } from '@/components/SelectProduct/SelectProduct'
// @ts-ignore
import { Search } from '@element-plus/icons-vue'
import { BasicProduct } from 'common'

/**
 * 选择产品
 *
 * <h2>两种 v-model</h2>
 * - v-model / v-model:value 仅使用 productId {@link BasicProduct._id}
 * - v-model:product 包含商品基础信息 (不含规格信息)
 *
 * @author 冰凝
 * @date 2022-07-08 下午 03:27
 **/
const props = defineProps({
    value: {
        type: String,
        default: '',
    },
    product: {
        type: [ Object, BasicProduct ],
        default: () => ({}),
    },
})
const emits = defineEmits<{
    (event: 'update', productId: string): void
    (event: 'update:value', productId: string): void
    (event: 'update:product', product: BasicProduct): void
}>()

const {
    isShow, page, queryData, pageIsLoading, currentSelect, echoIsLoading,
    close, show, queryFormSubmit, select,
} = new SelectProduct(props, emits)

</script>

<template>
<!-- 触发器: 选择按钮和商品信息展示 -->
<div v-loading="echoIsLoading">
    <ShowProduct v-show="currentSelect" :data="currentSelect" @click="show" />
    <el-button v-show="!currentSelect" @click="show">
        选择商品
    </el-button>
</div>
<!-- 模态框 -->
<el-dialog
    v-model="isShow"
    append-to-body
    close-on-click-modal
    draggable
    lock-scroll
    modal
    title="选择商品"
    width="60%"
>
    <div style="height: 60vh">
        <!-- 筛选条件 -->
        <div>
            <el-form ref="queryFormRef" :model="queryData" inline label-width="80px">
                <el-form-item>
                    <el-input v-model="queryData.name" clearable placeholder="商品名称" v-on:keyup.enter="queryFormSubmit" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="queryData.keyword" clearable placeholder="关键字" v-on:keyup.enter="queryFormSubmit" />
                </el-form-item>
                <el-form-item>
                    <el-button :icon="Search" type="primary" @click="queryFormSubmit" />
                </el-form-item>
            </el-form>
        </div>

        <!-- 列表 -->
        <el-row v-loading="pageIsLoading" :gutter="30">
            <el-col v-for="line in page.list" :key="line._id" :lg="8" :md="8" :xl="8" :xm="8" :xs="12">
                <el-card
                    :body-style="{padding: '5px'}"
                    class="product-card"
                    shadow="hover"
                    @click="select(line)"
                >
                    <ShowProduct :data="line" />
                </el-card>
            </el-col>
        </el-row>
    </div>
    <!-- 分页 -->
    <CrudPagination :service="{page}" style="padding-bottom: 20px" />
    <div slot="footer" class="drawer-body-footer" style="padding-left: 30px; text-align: right">
        <el-button @click="close">取 消</el-button>
    </div>
</el-dialog>
</template>

<style lang="sass" scoped>
.product-card
    margin-bottom: 15px
    cursor: pointer

</style>
