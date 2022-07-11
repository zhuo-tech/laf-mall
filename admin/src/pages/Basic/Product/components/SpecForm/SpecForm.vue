<script lang="ts" setup>
import { BasicSpecProduct, SpecType } from 'common'
import { reactive, watch } from 'vue'

const props = defineProps<{
    specType: SpecType
    value?: Partial<BasicSpecProduct>
}>()

const emits = defineEmits<{
    (event: 'update', value: Partial<BasicSpecProduct>): void
    (event: 'update:value', value: Partial<BasicSpecProduct>): void
}>()

const formData = reactive<Partial<BasicSpecProduct>>(props.value ?? new BasicSpecProduct())

watch(() => formData, () => {
    emits('update', formData)
    emits('update:value', formData)
}, {
    deep: true,
})

const {SingleSpec, MultipleSpec} = SpecType
</script>

<template>
<div>
    <el-form v-if="props.specType === SingleSpec" ref="form" :model="formData" label-width="140px">
        <el-row :gutter="10">
            <el-col :span="12">
                <el-form-item label="条形码" prop="barCode">
                    <el-input v-model="formData.barCode" placeholder="请输入条形码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="库存" prop="stock">
                    <el-input-number v-model="formData.stock" :min="0" placeholder="请输入库存"></el-input-number>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-form-item label="价格" prop="price">
                    <el-input-number v-model="formData.price" :controls="true" :min="0" placeholder="请输入价格"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="成本价" prop="cost">
                    <el-input-number v-model="formData.cost" :min="0" placeholder="请输入成本价"></el-input-number>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-form-item label="原价" prop="originalPrice">
                    <el-input-number v-model="formData.originalPrice" :min="0" placeholder="请输入原价"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="邮费" prop="postage">
                    <el-input-number v-model="formData.postage" :controls="true" :min="0" placeholder="请输入邮费"></el-input-number>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <el-form v-if="props.specType === MultipleSpec" ref="form" :model="formData" label-width="140px">
        <div>你好啊</div>
    </el-form>
</div>

</template>
