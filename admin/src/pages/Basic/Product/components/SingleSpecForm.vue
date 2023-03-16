<script lang="ts" setup>
import { BasicSpecProduct } from 'common'
import { ref, watch } from 'vue'
import PriceForm from './PriceForm.vue'

const props = defineProps<{ value?: Partial<BasicSpecProduct> }>()
const emits = defineEmits<{
    (event: 'update', value: Partial<BasicSpecProduct>): void
}>()

const formData = ref<Partial<BasicSpecProduct>>({})

watch(() => props.value, (newValue) => {
    newValue ? formData.value = newValue : formData.value = new BasicSpecProduct()
    emits('update', formData.value)
}, {
    immediate: true,
    deep: true,
})
</script>

<template>
<el-form ref="form" :model="formData" label-width="140px">
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
            <PriceForm v-model:value="formData.price" label="价格" placeholder="请输入商品价格" />
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
</template>

<style lang="sass" scoped>
</style>
