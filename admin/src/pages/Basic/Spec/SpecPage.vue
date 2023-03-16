<script lang="ts" setup>
import { CrudPagination, TableLineAction, TablePage, TagList } from '@/components'
import { BasicSpecService } from '@/pages/Basic/Spec/BasicSpecService'
import { formatDate } from '@/util/Format'

/**
 * Category
 * @author 冰凝
 * @date 2022-06-20 下午 04:37
 **/
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
} = new BasicSpecService()

listUpdate()
</script>

<template>
<TablePage @create="readyAdd()" @refresh="listUpdate">
    <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" border class="data-table" fit show-header stripe>
        <el-table-column align="center" label="序号" type="index" width="60" />
        <el-table-column align="center" label="规格组名称" min-width="100" prop="name" />
        <el-table-column align="left" header-align="center" label="规格项" min-width="300" prop="item">
            <template v-slot="{row}">
                <TagList :value="row.item" readonly />
            </template>
        </el-table-column>
        <el-table-column :formatter="formatDate()" align="center" label="创建时间" prop="createTime" width="180" />
        <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="180">
            <template v-slot="{row}">
                <TableLineAction @del="readyDelete(row)" @edit="readyEdit(row)" />
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
            <el-form-item label="规格组名称" prop="name">
                <el-input v-model="formData.name" autofocus clearable placeholder="规格组名称" />
            </el-form-item>

            <el-form-item label="规格" prop="item">
                <TagList v-model:value="formData.item" />
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
.el-carousel__item:nth-child(2n)
    background-color: #99a9bf


.el-carousel__item:nth-child(2n + 1)
    background-color: #d3dce6

</style>
