<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowImage from '@/components/Show/index.vue'
import UploadFile from '@/components/Upload/UploadFile.vue'
import { formatDate } from '@/util/Format'
// @ts-ignore
import { CirclePlusFilled, Delete, Edit, Refresh, Search, Warning } from '@element-plus/icons-vue'
import { UserService } from './Service'

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
    roleSelectOption
} = new UserService()

listUpdate()

</script>

<template>
<el-card class="box-card" header="管理员账号">
    <!-- 搜索区域 & 功能按钮 -->
    <el-row justify="end" type="flex">
        <el-collapse-transition>
            <el-col v-show="showQuery">
                <el-form ref="queryFormRef" :model="queryData" inline label-width="80px">
                    <el-form-item>
                        <el-input v-model="queryData.nickname" clearable placeholder="姓名"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input v-model="queryData.username" clearable placeholder="账号"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="queryData.isAdmin" clearable placeholder="用户类型">
                            <el-option label="管理员" :value="true"/>
                            <el-option label="普通用户" :value="false"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="queryData.freeze" clearable placeholder="冻结">
                            <el-option label="正常" :value="false"/>
                            <el-option label="冻结" :value="true"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button :icon="Search" type="primary" @click="queryFormSubmit"></el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-collapse-transition>
        <el-col :span="12">
            <el-row justify="end" type="flex">
                <el-button :icon="CirclePlusFilled" type="primary" @click="readyAdd()">新建账号</el-button>
                <el-button :icon="Search" type="primary" @click="showQuery = !showQuery" />
                <el-button v-loading="formIsLoading" :disabled="formIsLoading" :icon="Refresh" type="primary" @click="listUpdate" />
            </el-row>
        </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" class="data-table" fit show-header stripe>
        <el-table-column align="center" label="序号" type="index" width="60" />
        <el-table-column align="left" label="登录账号" min-width="100" prop="username" />
        <el-table-column align="left" label="头像" prop="avatar" width="130">
            <template v-slot="{row}">
                <ShowImage :src="row.avatar" style="width: 70px;" />
            </template>
        </el-table-column>
        <el-table-column align="left" label="姓名" min-width="100" prop="nickname" />
        <el-table-column align="left" label="角色" min-width="200" prop="roleInfo">
            <template v-slot="{row}">
                <el-tag v-for="({key, name}) in row.roleInfo" :key="key" class="lower-right-margin">
                    {{ name }}
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

            <el-form-item label="登录账号" prop="username">
                <el-input v-model="formData.username" :disabled="!formIsAdd" clearable placeholder="登录账户"></el-input>
            </el-form-item>

            <el-form-item v-if="formIsAdd" label="登录密码" prop="password">
                <el-input v-model="formData.password" clearable placeholder="密码"></el-input>
            </el-form-item>

            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="formData.nickname" clearable placeholder="姓名"></el-input>
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
                <UploadFile v-model:href="formData.avatar"
                            :limit="1"
                            listType="picture-card" />
            </el-form-item>

            <el-form-item v-if="!formIsAdd" label="锁定" prop="freeze">
                <el-switch v-model="formData.freeze" :active-value="true" :inactive-value="false"></el-switch>
            </el-form-item>

            <el-form-item label="角色" prop="role">
                <el-select v-model="formData.role" clearable multiple placeholder="选择角色" style="width: 100%;">
                    <el-option v-for="(rule, index) in roleSelectOption" :key="index" :label="rule.label" :value="rule.value" />
                </el-select>
            </el-form-item>

        </el-form>

        <div slot="footer" class="drawer-body-footer" style="padding-left: 30px;text-align: right">
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
