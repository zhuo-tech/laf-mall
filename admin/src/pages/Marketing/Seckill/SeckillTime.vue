<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowImage from '@/components/Show/ShowImage.vue'
import { UniversalConfigRepository } from '@/repository/UniversalConfigRepository'
import BasisCrud from '@/service/BasisCrud'
import { formatDate } from '@/util/Format'
import { CirclePlusFilled, Delete, Edit, Refresh, Warning } from '@element-plus/icons-vue'
import { RuleItem } from 'async-validator'
import { Entity, MallConfigKey, SeckillTimePeriod } from 'common'

type SeckillTimePeriodEntity = SeckillTimePeriod & Entity

/**
 * SpikeTime
 * @author 冰凝
 * @date 2022-07-07 下午 01:12
 **/
class SpikeTime extends BasisCrud<SeckillTimePeriodEntity> {
    protected readonly request = new UniversalConfigRepository<SeckillTimePeriodEntity>(MallConfigKey.SECKILL_TIME_PERIOD)

    public formRule: Partial<Record<keyof SeckillTimePeriodEntity, Array<RuleItem>>> = {
        start: [{type: 'number', min: 0, max: 23, message: '请选择开始时间', trigger: 'blur'}],
        length: [
            {type: 'number', min: 1, max: 23, message: '请选择开始时间', trigger: 'blur'},
            {
                validator: (rule, value, callback, source, option) => {
                    console.debug('验证结束时间', {rule, value, callback, source, option})
                },
            },
        ],
    }
}

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
} = new SpikeTime()

</script>

<template>
<div>
    <el-card header="秒杀时间段配置">

        <!-- 搜索区域 & 功能按钮 -->
        <el-row justify="end" type="flex">
            <el-col :span="12">
                <el-row justify="end" type="flex">
                    <el-button :icon="CirclePlusFilled" type="primary" @click="readyAdd()">新建</el-button>
                    <el-button v-loading="formIsLoading" :disabled="formIsLoading" :icon="Refresh" type="primary" @click="listUpdate" />
                </el-row>
            </el-col>
        </el-row>

        <!-- 表格 -->
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

            <el-form :ref="setFormRef"
                     v-loading="formIsLoading"
                     :model="formData"
                     :rules="formRule"
                     label-width="140px"
                     style="max-width: 1000px">
                <el-form-item label="开始时间" prop="start">
                    <el-time-select v-model="formData.startTime"
                                    :max-time="formData.endTime"
                                    class="mr-4"
                                    end="23:00"
                                    placeholder="开始时间"
                                    start="00:00"
                                    step="01:00" />
                </el-form-item>
                <el-form-item label="结束时间" prop="length">
                    <el-time-select v-model="formData.endTime"
                                    :min-time="formData.startTime"
                                    end="24:00"
                                    placeholder="结束时间"
                                    start="00:00"
                                    step="01:00" />
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
</div>
</template>

<style lang="sass" scoped>
</style>
