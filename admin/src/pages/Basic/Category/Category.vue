<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowImage from '@/components/Show/ShowImage.vue'
import UploadFile from '@/components/Upload/UploadFile.vue'
import { formatDate } from '@/util/Format'
import { CirclePlusFilled, Delete, Edit, Refresh, Search, Warning } from '@element-plus/icons-vue'
import { CategoryService } from './Service'

const {
    close,
    formData,
    formIsAdd,
    formIsLoading,
    formRef,
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
<el-card class="box-card" header="系统权限">
    <!-- 搜索区域 & 功能按钮 -->
    <el-row justify="end" type="flex">
        <el-collapse-transition>
            <el-col v-show="showQuery">
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
            </el-col>
        </el-collapse-transition>
        <el-col :span="12">
            <el-row justify="end" type="flex">
                <el-button :icon="CirclePlusFilled" type="primary" @click="readyAdd()">新建</el-button>
                <el-button :icon="Search" type="primary" @click="showQuery = !showQuery" />
                <el-button v-loading="formIsLoading" :disabled="formIsLoading" :icon="Refresh" type="primary" @click="listUpdate" />
            </el-row>
        </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" class="data-table" fit show-header stripe>
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
        <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="180">
            <template v-slot="{row}">
                <el-button :icon="Edit" link @click="readyEdit(row)">编辑</el-button>
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
        title="">
        <el-form :ref="el => formRef = el"
                 v-loading="formIsLoading"
                 :model="formData"
                 :rules="formRule"
                 label-width="140px"
                 style="max-width: 1000px">
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

</el-card>
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
