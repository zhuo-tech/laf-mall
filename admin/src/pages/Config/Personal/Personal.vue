<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowImage from '@/components/Show/index.vue'
import UploadFile from '@/components/Upload/UploadFile.vue'
import { PersonalService } from '@/pages/Config/Personal/Service'
// @ts-ignore
import { CirclePlusFilled, Delete, Edit, Refresh, Warning } from '@element-plus/icons-vue'

const {
    setFormRef,
    close,
    formData,
    formIsAdd,
    formIsLoading,
    formRule,
    formSubmit,
    isShow,
    listUpdate,
    page,
    queryFormSubmit,
    readyAdd,
    readyDelete,
    readyEdit,
    rowKey,
    tableIsLoading,
} = new PersonalService()
listUpdate()
</script>

<template>
<el-card class="box-card" header="个人中心">
    <!--新建和刷新-->
    <el-row>
        <el-col :offset="12" :span="12">
            <el-row justify="end" type="flex">
                <el-button :icon="CirclePlusFilled" type="primary" @click="readyAdd()">新建</el-button>
                <el-button v-loading="formIsLoading" :disabled="formIsLoading" :icon="Refresh" type="primary" @click="listUpdate" />
            </el-row>
        </el-col>
    </el-row>
    <!--表格-->
    <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" class="data-table" fit show-header stripe>
        <el-table-column align="center" label="序号" type="index" width="60" />
        <el-table-column align="center" label="菜单名" min-width="200" prop="name" />
        <el-table-column align="left" label="网页端图标" min-width="130" prop="pcIcon">
            <template v-slot="{row}">
                <ShowImage :src="row.pcIcon" style="width: 70px;" />
            </template>
        </el-table-column>
        <el-table-column align="left" label="移动端图标" min-width="130" prop="uniIcon">
            <template v-slot="{row}">
                <ShowImage :src="row.uniIcon" style="width: 70px;" />
            </template>
        </el-table-column>
        <el-table-column align="center" label="uniapp URL" min-width="350" prop="uniUrl" />
        <el-table-column align="center" label="URL" min-width="350" prop="pcUrl" />
        <el-table-column align="left" label="排序" min-width="60" prop="sort" />
        <el-table-column align="left" label="状态" min-width="100" prop="status">
            <template v-slot="{row}">
                <span>{{ row.status ? '显示' : '不显示' }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="180">
            <template v-slot="{row}">
                <el-button :icon="Edit" link @click="readyEdit(row)">编辑</el-button>
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
    <!--新增-->
    <el-dialog
        v-model="isShow"
        append-to-body
        close-on-click-modal
        destroy-on-close
        draggable
        lock-scroll
        modal
        title=""
        width="45%"
    >
        <el-form
            :ref="setFormRef"
            v-loading="formIsLoading"
            :model="formData"
            :rules="formRule"
            label-width="140px"
            style="max-width: 1000px"
        >

            <el-form-item label="菜单名称" prop="name">
                <el-input v-model="formData.name" clearable placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="网页端图标" prop="pcIcon">
                        <UploadFile
                            v-model:href="formData.pcIcon"
                            :limit="1"
                            :show-file-list="false"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="移动端图标" prop="uniIcon">
                        <UploadFile
                            v-model:href="formData.uniIcon"
                            :limit="1"
                            :show-file-list="false"
                        />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="uniapp URL" prop="uniUrl">
                <el-input v-model="formData.uniUrl" clearable placeholder="请输入uniapp URL"></el-input>
            </el-form-item>

            <el-form-item label="URL" prop="pcUrl">
                <el-input v-model="formData.pcUrl" clearable placeholder="请输入URL"></el-input>
            </el-form-item>

            <el-form-item label="排序" prop="sort">
                <el-input-number v-model="formData.sort" :min="0" :step="1" step-strictly />
            </el-form-item>

            <el-form-item label="状态" prop="status">
                <el-switch v-model="formData.status" :active-value="true" :inactive-value="false"></el-switch>
            </el-form-item>
        </el-form>

        <el-row>
            <el-col :span="24" style="text-align: right">
                <div slot="footer" class="drawer-body-footer" style="padding-left: 30px">
                    <el-button @click="close">取 消</el-button>
                    <el-button :loading="formIsLoading" type="primary" @click="formSubmit">
                        {{ formIsLoading ? '提交中 ...' : '确 定' }}
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </el-dialog>
</el-card>
</template>

<style lang="sass" scoped>
.box-card
    min-height: 50vh

</style>
