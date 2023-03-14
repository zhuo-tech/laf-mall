<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import { formatDate } from '@/util/Format'
// @ts-ignore
import { CirclePlusFilled, Delete, Edit, Refresh, Search, Warning } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { defaultAction, PermissionService } from './Service'

const {
    close,
    formData,
    formIsAdd,
    formIsLoading,
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
    defaultPermissions,
    batchSelection,
    lineChange,
    bulkSave,
    bulkSaveIsLoading,
    selectAllButton,
    setFormRef,
} = new PermissionService()
listUpdate()

const editFormTabs = ref<string>('preset')

</script>

<template>
<el-card class="box-card" header="系统权限">
    <!-- 搜索区域 & 功能按钮 -->
    <el-row justify="end" type="flex">
        <el-collapse-transition>
            <el-col v-show="showQuery">
                <el-form ref="queryFormRef" :model="queryData" inline label-width="80px">
                    <el-form-item>
                        <el-input v-model="queryData.name" clearable placeholder="key" v-on:keyup.enter="queryFormSubmit" />
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="queryData.desc" clearable placeholder="描述" v-on:keyup.enter="queryFormSubmit" />
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
        <el-table-column align="left" label="key" min-width="100" prop="name" />
        <el-table-column align="left" label="名称" min-width="100" prop="desc" />
        <el-table-column :formatter="formatDate()" align="center" label="创建时间" prop="createTime" width="180" />
        <el-table-column :formatter="formatDate()" align="center" label="更新时间" prop="updateTime" width="180" />
        <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="180">
            <template v-slot="{row}">
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

        <el-tabs v-if="formIsAdd" v-model="editFormTabs" stretch style="min-height: 300px">
            <el-tab-pane v-loading="bulkSaveIsLoading" label="预设" name="preset">
                <el-table :data="defaultPermissions" class="data-table" fit show-header stripe>
                    <el-table-column align="center" fixed="left" label="表名" min-width="100" prop="tableName">
                        <template v-slot="{row}">
                            <span style="padding-right: 25px">{{ row.tableName.key }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" fixed="left" label="" width="90">
                        <template v-slot="{row}">
                            <el-checkbox
                                v-model="selectAllButton[row.tableName.value]"
                                label="全选"
                                @change="(select) => lineChange(row.tableName, select)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-for="actionKv in defaultAction"
                        :key="actionKv.value"
                        :label="actionKv.key"
                        :prop="actionKv.value"
                        align="left"
                        min-width="100"
                    >
                        <template v-slot="{row}">
                            <el-checkbox
                                v-model="batchSelection[row[actionKv.value].value]"
                                :false-label="''"
                                :label="row[actionKv.value].key"
                                :true-label="row[actionKv.value].key"
                                @change="lineChange"
                            />
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: right; padding: 30px;">
                    <el-button type="primary" @click="bulkSave">保存</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="自定义" name="customize">
                <el-form
                    :ref="setFormRef"
                    v-loading="formIsLoading"
                    :model="formData"
                    :rules="formRule"
                    label-width="140px"
                    style="max-width: 1000px"
                >
                    <el-form-item label="KEY" prop="name">
                        <el-input v-model="formData.name" :disabled="!formIsAdd" clearable placeholder="KEY"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="desc">
                        <el-input v-model="formData.desc" clearable placeholder="描述"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="close">取 消</el-button>
                        <el-button :loading="formIsLoading" type="primary" @click="formSubmit">
                            {{ formIsLoading ? '提交中 ...' : '确 定' }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <!-- 和楼上的自定义表单重复, 懒 -->
        <el-form
            v-else
            :ref="setFormRef"
            v-loading="formIsLoading"
            :model="formData"
            :rules="formRule"
            label-width="140px"
            style="max-width: 1000px"
        >
            <el-form-item label="KEY" prop="name">
                <el-input v-model="formData.name" :disabled="!formIsAdd" clearable placeholder="KEY"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input v-model="formData.desc" clearable placeholder="描述"></el-input>
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
