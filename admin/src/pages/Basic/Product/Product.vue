<script lang="ts" setup>
import { CrudPagination, ShowImage, TableLineAction, TablePage } from '@/components'
import { ProductService } from '@/pages/Basic/Product/Service'
import { BasicRouterControl } from '@/pages/Basic/Router'
import { Edit, Search } from '@element-plus/icons-vue'
import { onActivated } from 'vue'

/**
 * Product
 * @author 冰凝
 * @date 2022-06-20 下午 04:38
 **/
const {
    rowKey,
    page,
    tableIsLoading,
    showQuery,
    queryData,
    formIsLoading,
    readyDelete,
    listUpdate,
    readyAdd,
    queryFormSubmit,
} = new ProductService()
onActivated(() => listUpdate())
</script>

<template>
<TablePage @create="BasicRouterControl.toProductCreate()" @refresh="listUpdate">
    <template #searchForm>
        <el-form ref="queryFormRef" :model="queryData" inline label-width="80px">
            <el-form-item>
                <el-input v-model="queryData.nickname" clearable placeholder="所属分类"></el-input>
            </el-form-item>

            <el-form-item>
                <el-input v-model="queryData.username" clearable placeholder="商品名称"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button :icon="Search" type="primary" @click="queryFormSubmit"></el-button>
            </el-form-item>
        </el-form>
    </template>

    <!-- 表格 -->
    <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" class="data-table" fit show-header stripe>
        <el-table-column align="center" label="序号" type="index" width="60" />
        <el-table-column align="left" label="所属分类" min-width="150" prop="categoryId">
            <template v-slot="{row}">
                <span>{{ row.category.name }}</span>
            </template>
        </el-table-column>
        <el-table-column align="left" label="商品名称" prop="name" width="130" />
        <el-table-column align="left" label="商品价格" min-width="100" prop="nickname" />
        <el-table-column align="left" label="会员价" min-width="200" prop="roleInfo" />
        <el-table-column align="left" label="销量" min-width="200" prop="virtualSales" />
        <el-table-column align="left" label="库存" min-width="200" prop="roleInfo" />
        <el-table-column align="left" label="状态" min-width="200" prop="status">
            <template v-slot="{row}">
                <span>{{ row.status ? '已启动' : '关闭' }}</span>
            </template>
        </el-table-column>
        <el-table-column align="left" label="排序" min-width="200" prop="sort" />
        <el-table-column align="left" label="移动端封面图" min-width="200" prop="uniUrl">
            <template v-slot="{row}">
                <ShowImage :src="row.uniUrl" style="width: 70px;" />
            </template>
        </el-table-column>
        <el-table-column align="left" label="网页端封面图" min-width="200" prop="pcUrl">
            <template v-slot="{row}">
                <ShowImage :src="row.pcUrl" style="width: 70px;" />
            </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="380">
            <template v-slot="{row}">
                <el-button :icon="Edit" link @click="BasicRouterControl.toProductDetail(row._id)">详情</el-button>
                <el-divider direction="vertical" />
                <TableLineAction @del="readyDelete(row)" @edit="BasicRouterControl.toProductUpdate(row._id)" />
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <CrudPagination :service="{page}" style="padding-top: 20px" />
</TablePage>
</template>

<style lang="sass" scoped>
</style>
