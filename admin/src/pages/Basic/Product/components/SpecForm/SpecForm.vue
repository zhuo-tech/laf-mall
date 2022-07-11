<script lang="ts" setup>
import { BasicSpecProduct, SpecType } from 'common'
import { ref } from 'vue'

const props = defineProps<{
    specType: SpecType
    value: Partial<BasicSpecProduct>
}>()

const emits = defineEmits<{
    (event: 'update:value', value: Partial<BasicSpecProduct>): void
}>()

const formatData = ref<Partial<BasicSpecProduct>>({})
</script>

<template>
<el-form v-if="props.specType === 0" ref="form" :model="props.value" label-width="140px">
    <el-row :gutter="10">
        <el-col :span="8">
            <el-form-item label="条形码" prop="barCode">
                <el-input v-model="props.value.barCode" placeholder="请输入条形码"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="库存" prop="stock">
                <el-input-number v-model="props.value.stock" :min="0" placeholder="请输入库存"></el-input-number>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="价格" prop="price">
                <el-input-number v-model="props.value.price" :controls="true" :min="0" placeholder="请输入价格"></el-input-number>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="8">
            <el-form-item label="成本价" prop="cost">
                <el-input-number v-model="props.value.cost" :min="0" placeholder="请输入成本价"></el-input-number>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="原价" prop="originalPrice">
                <el-input-number v-model="props.value.originalPrice" :min="0" placeholder="请输入原价"></el-input-number>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="邮费" prop="postage">
                <el-input-number v-model="props.value.postage" :controls="true" :min="0" placeholder="请输入邮费"></el-input-number>
            </el-form-item>
        </el-col>
    </el-row>
</el-form>
</template>

<style scoped>

</style>
