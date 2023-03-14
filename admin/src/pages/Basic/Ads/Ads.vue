<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowImage from '@/components/Show/index.vue'
import UploadFile from '@/components/Upload/UploadFile.vue'
import { AdsService } from '@/pages/Basic/Ads/Service'
import { formatDate } from '@/util/Format'
// @ts-ignore
import { CirclePlusFilled, Delete, Edit, Refresh, Warning } from '@element-plus/icons-vue'

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
} = new AdsService()

listUpdate()
</script>

<template>
<div>
    <el-card header="首页广告">

        <!-- 搜索区域 & 功能按钮 -->
        <el-row justify="end" type="flex">
            <el-col :span="12">
                <el-row justify="end" type="flex">
                    <el-button :icon="CirclePlusFilled" type="primary" @click="readyAdd()">新建</el-button>
                    <el-button v-loading="formIsLoading" :disabled="formIsLoading" :icon="Refresh" type="primary" @click="listUpdate" />
                </el-row>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :md="24" :xl="12">
                <el-carousel :interval="4000" height="40vh">
                    <el-carousel-item v-for="(item, index) in page.list" :key="index">
                        <ShowImage :previewSrcList="[]" :src="item.href" fit="cover" style="width: 100%;height: 100%;" />
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <!-- 表格 -->
            <el-col :md="24" :xl="12">
                <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" class="data-table" fit show-header stripe>
                    <el-table-column align="center" label="序号" type="index" width="60" />
                    <el-table-column align="left" label="排序" min-width="100" prop="sort" />
                    <el-table-column align="left" label="图片地址" min-width="100" prop="href">
                        <template v-slot="{row}">
                            <ShowImage :src="row.href" style="width: 50px;" />
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="目标地址" min-width="100" prop="target" />
                    <el-table-column :formatter="formatDate()" align="center" label="创建时间" prop="createTime" width="180" />
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
            </el-col>
        </el-row>
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
                <el-form-item label="图片地址" prop="href">
                    <UploadFile v-model:href="formData.href" :dray="false" list-type="picture-card" />
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="formData.sort" clearable />
                </el-form-item>

                <el-form-item label="跳转地址" prop="target">
                    <el-input v-model="formData.target" clearable placeholder="跳转地址"></el-input>
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
</div>
</template>

<style lang="sass" scoped>
.el-carousel__item:nth-child(2n)
    background-color: #99a9bf


.el-carousel__item:nth-child(2n + 1)
    background-color: #d3dce6

</style>
