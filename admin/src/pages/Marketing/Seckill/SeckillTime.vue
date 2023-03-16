<script lang="ts" setup>
import { CrudPagination, TableLineAction, TablePage } from '@/components'
import { UniversalConfigRepository } from '@/repository/UniversalConfigRepository'
import BasisCrud from '@/service/BasisCrud'
import { RuleItem } from 'async-validator'
import { Entity, MallConfigKey, SeckillTimePeriod } from 'common'

type SeckillTimePeriodEntity = SeckillTimePeriod & Entity

/**
 * SpikeTime
 * @author 冰凝
 * @date 2022-07-07 下午 01:12
 **/
class SpikeTime extends BasisCrud<SeckillTimePeriodEntity> {
    public override formRule: Partial<Record<keyof SeckillTimePeriodEntity, Array<RuleItem>>> = {
        start: [ { type: 'number', min: 0, max: 23, message: '请选择开始时间', trigger: 'blur' } ],
        end: [ { type: 'number', min: 1, max: 23, message: '请选择开始时间', trigger: 'blur' } ],
    }
    protected override readonly request = new UniversalConfigRepository<SeckillTimePeriodEntity>(MallConfigKey.SECKILL_TIME_PERIOD)

    protected override beforeSubmit(formData: Partial<SeckillTimePeriodEntity>): Partial<SeckillTimePeriodEntity> {
        const [ start, end ] = formData['range']
        return { start, end }
    }
}

const {
    formData, formIsAdd, formIsLoading, formRule, isShow, page, queryData, rowKey, showQuery, tableIsLoading,
    close, formSubmit, listUpdate, queryFormSubmit, readyAdd, readyDelete, readyEdit, setFormRef,
} = new SpikeTime()

listUpdate()

</script>

<template>
<TablePage @create="readyAdd()" @refresh="listUpdate">
    <!-- 表格 -->
    <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" border class="data-table" fit show-header stripe>
        <el-table-column align="center" label="序号" type="index" width="60" />
        <el-table-column align="center" label="开始时间" prop="start" />
        <el-table-column align="center" label="持续时间" prop="end" />
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
        append-to-body
        close-on-click-modal
        destroy-on-close
        draggable
        lock-scroll
        modal
        title=""
        width="40%"
    >

        <el-form
            :ref="setFormRef"
            v-loading="formIsLoading"
            :model="formData"
            :rules="formRule"
            style="max-width: 1000px; min-height: 300px"
        >
            <el-form-item label="" prop="start">
                <el-time-picker
                    v-model="formData['range']"
                    arrow-control
                    editable
                    end-placeholder="结束时间"
                    format="HH:mm"
                    is-range
                    start-placeholder="开始时间"
                    value-format="HH:mm"
                />
            </el-form-item>
        </el-form>

        <div slot="footer" class="drawer-body-footer" style="padding-left: 30px;text-align: right">
            <el-button @click="close">取 消</el-button>
            <el-button :loading="formIsLoading" type="primary" @click="formSubmit">
                {{ formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </div>
    </el-dialog>
</TablePage>
</template>

<style lang="sass" scoped>
</style>
