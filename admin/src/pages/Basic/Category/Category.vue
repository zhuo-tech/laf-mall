<script lang="ts" setup>
import { CrudPagination, ShowImage, TablePage, UploadFile } from '@/components'
import { formatDate } from '@/util'
import { CirclePlusFilled, Delete, Edit, Search, Warning } from '@element-plus/icons-vue'
import { CategoryService } from './Service'

const {
    close,
    formData,
    formIsAdd,
    formIsLoading,
    setFormRef,
    formRule,
    formSubmit,
    isShow,
    listUpdate,
    page,
    queryData,
    queryFormSubmit,
    readyAdd,
    readyDelete,
    readyEdit,
    rowKey,
    showQuery,
    tableIsLoading,
} = new CategoryService()
listUpdate()

</script>

<template>
<TablePage @create="readyAdd()" @refresh="listUpdate">

    <template #searchForm>
        <el-form ref="queryFormRef" :model="queryData" inline label-width="80px">
            <el-form-item>
                <el-input v-model="queryData.name" clearable placeholder="分类名" v-on:keyup.enter="queryFormSubmit" />
            </el-form-item>
            <el-form-item>
                <el-checkbox-group v-model="queryData.isShow" @change="queryFormSubmit">
                    <el-checkbox-button :label="true">启用</el-checkbox-button>
                    <el-checkbox-button :label="false">禁用</el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search" type="primary" @click="queryFormSubmit"></el-button>
            </el-form-item>
        </el-form>
    </template>

    <!-- 表格 -->
    <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" border class="data-table" fit show-header stripe>
        <el-table-column align="center" label="序号" type="index" width="60" />
        <el-table-column align="left" label="分类名" min-width="100" prop="name" />
        <el-table-column align="left" label="排序" min-width="100" prop="sort" />
        <el-table-column align="left" label="图标" min-width="100" prop="cover">
            <template v-slot="{row}">
                <ShowImage :src="row.cover" fit="cover" style="width: 50px;" />
            </template>
        </el-table-column>

        <el-table-column :formatter="formatDate()" align="center" label="创建时间" prop="createTime" width="180" />
        <el-table-column :formatter="formatDate()" align="center" label="更新时间" prop="updateTime" width="180" />
        <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="280">
            <template v-slot="{row}">
                <el-button :icon="CirclePlusFilled" link @click="readyEdit(row)">新增子节点</el-button>
                <el-divider direction="vertical" />
                <el-button :icon="Edit" link @click="readyEdit(row)">编辑</el-button>
                <el-divider direction="vertical" />
                <el-popconfirm
                    :icon="Warning"
                    cancel-button-text="手滑了"
                    confirm-button-text="确认删除"
                    icon-color="red"
                    title=" 操作无法撤销, 确定要删除吗 ？"
                    @confirm="readyDelete(row)"
                >
                    <template #reference>
                        <el-button :icon="Delete" link>删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <CrudPagination :service="{page}" style="padding-top: 20px" />

    <!--  编辑抽屉 -->
    <el-dialog
        v-model="isShow"
        :width="formIsAdd ? '60%' : '40%'"
        append-to-body
        close-on-click-modal
        destroy-on-close
        draggable
        lock-scroll
        modal
        title=""
    >
        <el-form
            :ref="setFormRef"
            v-loading="formIsLoading"
            :model="formData"
            :rules="formRule"
            label-width="140px"
            style="max-width: 1000px"
        >

            <el-form-item label="父级" prop="parentId">
                <el-tree-select
                    v-model="formData.parentId"
                    :data="page.list"
                    :props="{label: 'name', value: '_id'}"
                    check-strictly
                    style="width: 100%;"
                />
            </el-form-item>

            <el-form-item label="分类名" prop="name">
                <el-input v-model="formData.name" clearable placeholder="请输入分类名称" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input-number v-model="formData.sort" :max="1000" :min="1" clearable />
            </el-form-item>
            <el-form-item label="封面图标" prop="cover">
                <UploadFile v-model:href="formData.cover" accept="image/*" listType="picture-card" />
            </el-form-item>
            <el-form-item>
                <el-button @click="close">取 消</el-button>
                <el-button :loading="formIsLoading" type="primary" @click="formSubmit">
                    {{ formIsLoading ? '提交中 ...' : '确 定' }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

</TablePage>
</template>

<style lang="sass" scoped>
.box-card
    min-height: 50vh

    .data-table
        width: 100%

    .lower-right-margin
        margin-right: 10px
        margin-bottom: 10px
</style>
