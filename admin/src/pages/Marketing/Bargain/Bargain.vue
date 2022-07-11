<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowImage from '@/components/Show/ShowImage.vue'
import { BargainService } from '@/pages/Marketing/Bargain/BargainService'
import { MarketingRouterControl } from '@/pages/Marketing/Router'
import { CirclePlusFilled, Delete, Edit, Refresh, Search, Warning } from '@element-plus/icons-vue'

/**
 * Bargain
 * @author 冰凝
 * @date 2022-07-07 下午 01:16
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
} = new BargainService()

listUpdate()
</script>

<template>
<el-card header="商品">
    <el-row justify="end" type="flex">
        <el-collapse-transition>
            <el-col v-show="showQuery">
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
            </el-col>
        </el-collapse-transition>
        <el-col :span="12">
            <el-row justify="end" type="flex">
                <el-button :icon="CirclePlusFilled" type="primary" @click="MarketingRouterControl.toBargainCreate()">新增</el-button>
                <el-button :icon="Search" type="primary" @click="showQuery = !showQuery" />
                <el-button v-loading="formIsLoading" :disabled="formIsLoading" :icon="Refresh" type="primary" @click="listUpdate" />
            </el-row>
        </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" class="data-table" fit show-header stripe>
        <el-table-column align="center" label="序号" type="index" width="60" />
        <el-table-column align="left" label="所属分类" min-width="100" prop="categoryId" />
        <el-table-column align="left" label="商品名称" prop="name" width="130" />
        <el-table-column align="left" label="商品价格" min-width="100" prop="nickname" />
        <el-table-column align="left" label="会员价" min-width="200" prop="roleInfo" />
        <el-table-column align="left" label="销量" min-width="200" prop="roleInfo" />
        <el-table-column align="left" label="库存" min-width="200" prop="roleInfo" />
        <el-table-column align="left" label="状态" min-width="200" prop="status" />
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
                <el-button :icon="Edit" link @click="MarketingRouterControl.toBargainUpdate(row._id)">编辑</el-button>
                <el-divider direction="vertical" />
                <el-popconfirm :icon="Warning"
                               cancel-button-text="手滑了"
                               confirm-button-text="确认删除"
                               icon-color="red"
                               title=" 操作无法撤销, 确定要删除吗 ？"
                               @confirm="readyDelete(row)">
                    <template #reference>
                        <el-button :icon="Delete" link>删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <CrudPagination :service="{page}" style="padding-top: 20px" />
</el-card>
</template>

<style lang="sass" scoped>
</style>
