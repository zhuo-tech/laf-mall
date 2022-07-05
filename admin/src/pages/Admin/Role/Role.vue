<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import { formatDate } from '@/util/Format'
import { CirclePlusFilled, Delete, Edit, Refresh, Search, Warning } from '@element-plus/icons-vue'
import { RoleService } from './Service'

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
    perSelectOption,
} = new RoleService()

listUpdate()

</script>

<template>
<el-card class="box-card" header="系统角色">
    <!-- 搜索区域 & 功能按钮 -->
    <el-row justify="end" type="flex">
        <el-collapse-transition>
            <el-col v-show="showQuery">
                <el-form ref="queryFormRef" :model="queryData" inline label-width="80px">
                    <el-form-item>
                        <el-input v-model="queryData.nickname" clearable placeholder="key" v-on:keyup.enter="queryFormSubmit" />
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="queryData.username" clearable placeholder="名称" v-on:keyup.enter="queryFormSubmit" />
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="queryData.username" clearable placeholder="描述" v-on:keyup.enter="queryFormSubmit" />
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
        <el-table-column align="left" label="KEY" min-width="100" prop="key" />
        <el-table-column align="left" label="角色名" min-width="100" prop="name" />
        <el-table-column align="left" label="描述" min-width="100" prop="desc" />
        <el-table-column align="left" label="权限列表" min-width="200" prop="permissions">
            <template v-slot="{row}">
                <el-tag v-for="(p) in row.per" :key="p.name" class="lower-right-margin">
                    {{ p.desc }}
                </el-tag>
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
        append-to-body
        close-on-click-modal
        destroy-on-close
        draggable
        lock-scroll
        modal
        title=""
        width="45%">
        <el-form :ref="setFormRef"
                 v-loading="formIsLoading"
                 :model="formData"
                 :rules="formRule"
                 label-width="140px"
                 style="max-width: 1000px">

            <el-form-item label="KEY" prop="key">
                <el-input v-model="formData.key" :disabled="!formIsAdd" clearable placeholder="key" />
            </el-form-item>
            <el-form-item label="角色名" prop="name">
                <el-input v-model="formData.name" clearable placeholder="角色名" />
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input v-model="formData.desc" clearable placeholder="描述" type="textarea" />
            </el-form-item>
            <el-form-item label="权限" prop="permissions">
                <el-transfer v-model="formData.permissions"
                             :data="perSelectOption"
                             :filterable="true"
                             :props="{key: 'value', label: 'label'}"
                             :titles="['未选择', '已选择', ]" />
            </el-form-item>

        </el-form>

        <div slot="footer" class="drawer-body-footer" style="padding-left: 30px">
            <el-button @click="close">取 消</el-button>
            <el-button :loading="formIsLoading" type="primary" @click="formSubmit">
                {{ formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </div>
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
