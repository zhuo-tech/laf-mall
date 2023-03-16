<template>
<el-tag
    v-for="tag in dynamicTags"
    :key="tag"
    :disable-transitions="false"
    class="mx-1"
    closable
    size="large"
    @close="handleClose(tag)"
>
    {{ tag.label }}
</el-tag>
<el-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    size="large"
    style="width: 100px;"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
/>
<el-button v-else class="button-new-tag" @click="showInput">
    + 新标签
</el-button>
</template>

<script lang="ts" setup>
import { ProductTag } from 'common'
import { ElInput } from 'element-plus'
import { nextTick, ref, watch } from 'vue'

const props = defineProps<{
    value?: ProductTag[]
}>()

const emits = defineEmits<{
    (event: 'update:value', value: ProductTag[]): void
}>()

const inputValue = ref('')
const dynamicTags = ref<ProductTag[]>(props.value as ProductTag[])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

watch(() => props.value, function (newValue) {
    // @ts-ignore
    dynamicTags.value = newValue
}, {
    immediate: true,
    deep: true,
})

const handleClose = (tag: ProductTag) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    emits('update:value', dynamicTags.value)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        const newTag: ProductTag = {
            label: inputValue.value,
        }
        if (!dynamicTags.value) {
            dynamicTags.value = []
        }
        dynamicTags.value.push(newTag)
        emits('update:value', dynamicTags.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}
</script>
