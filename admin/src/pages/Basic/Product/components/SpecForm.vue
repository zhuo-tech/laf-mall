<script lang="ts" setup>
import { BasicSpecProduct, SpecType } from 'common'
import { ref, watch } from 'vue'
import PriceForm from './PriceForm.vue'

const props = defineProps<{
    specType: SpecType
    value?: Partial<BasicSpecProduct>
}>()

const emits = defineEmits<{
    (event: 'update', value: Partial<BasicSpecProduct>): void
}>()

const formData = ref<Partial<BasicSpecProduct>>({})

watch(() => props.value, (newValue) => {
    console.log('监听', newValue)
    newValue ? formData.value = newValue : formData.value = new BasicSpecProduct()
    emits('update', formData.value)
}, {
    immediate: true,
    deep: true,
})

const { SingleSpec, MultipleSpec } = SpecType
</script>

<template>
<div>
    <el-collapse-transition appear mode="out-in">
        <el-form v-if="props.specType === SingleSpec" ref="form" :model="formData" class="mark" label-width="140px">
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
    </el-collapse-transition>
    <el-collapse-transition appear mode="out-in">
        <el-form v-if="props.specType === MultipleSpec" ref="form" :model="formData" class="mark" label-width="140px">

            <h1>多规格表单</h1>

        </el-form>
    </el-collapse-transition>
</div>

</template>

<style lang="sass">
.mark
    border: 1px solid red
</style>
