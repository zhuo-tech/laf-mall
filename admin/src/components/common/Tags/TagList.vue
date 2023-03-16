<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { ArrayTool, StrTool } from '@es-tool/core'
import { nextTick, ref, watch } from 'vue'

const props = defineProps<{
    value?: Array<string>
    readonly?: boolean
}>()
const emits = defineEmits<{
    (event: 'update:value', value: Array<string>): void
}>()

const valueList = ref<Array<string>>([])
const tempValue = ref<string>(StrTool.EMPTY)
const showInput = ref<boolean>(false)
const addBtn = ref<{ ref: HTMLButtonElement } | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

watch(
    () => props.value,
    () => {
        if (ArrayTool.isNotEmpty(props.value)) {
            valueList.value = props.value!
        }
    },
    { immediate: true },
)

const prepareAdd = () => {
    showInput.value = true
    nextTick(() => inputRef.value?.focus())
}

const add = () => {
    if (StrTool.isNotEmpty(tempValue.value)) {
        valueList.value.push(tempValue.value)
        emits('update:value', valueList.value)
        tempValue.value = StrTool.EMPTY
    } else {
        showInput.value = false
        tempValue.value = StrTool.EMPTY
        nextTick(() => addBtn.value?.ref.focus())
    }
}

const remove = (item: string, index: number) => {
    valueList.value?.splice(index, 1)
    emits('update:value', valueList.value)
}

</script>
<template>
<el-tag
    v-for="(i, index) in valueList"
    :key="index"
    :closable="!readonly"
    :disable-transitions="false"
    size="large"
    @close="remove(i, index)"
>
    {{ i }}
</el-tag>
<span v-if="!readonly">
    <el-input
        v-if="showInput"
        ref="inputRef"
        v-model="tempValue"
        size="large"
        style="width: 100px"
        @blur="add"
        @keydown.enter.prevent="add"
    />
    <el-button v-else ref="addBtn" :icon="Plus" @click="prepareAdd">
        新增
    </el-button>
</span>
</template>
<style lang="sass" scoped>
.el-tag
    margin-right: 10px
</style>
