<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
    placeholder: string
    label: string
    value?: number
}>()

const emits = defineEmits<{
    (event: 'update:value', value: number): void
}>()

const formData = ref<number>(props.value as number)
const handleChange = (val: number) => {
    emits('update:value', parseInt(val * 100 + ''))
}
watch(() => props.value, (newValue) => {
    newValue ? formData.value = newValue / 100 : formData.value = 0
}, {immediate: true})
</script>

<template>
<el-form-item :label="label">
    <el-input-number v-model="formData" :min="0" :placeholder="placeholder" :precision="2" @change="handleChange"></el-input-number>
</el-form-item>
</template>

