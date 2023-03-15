<script lang="ts" setup>
import { TagType } from '@/pages/Config/Channel/Service'
import { ElInput } from 'element-plus'
import { nextTick, ref } from 'vue'

const props = defineProps<{
    value: TagType[]
}>()

const emits = defineEmits<{
    (event: 'update:value', value: TagType[]): void
}>()

const inputValue = ref('')
const dynamicTags = ref<TagType[]>(props.value)
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: TagType) => {
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
        const newTag: TagType = {
            id: Date.now().toString(),
            name: inputValue.value,
        }
        dynamicTags.value.push(newTag)
        emits('update:value', dynamicTags.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}

</script>

<template>
<el-tag
    v-for="tag in dynamicTags"
    :key="tag"
    :disable-transitions="false"
    class="mx-1"
    closable
    @close="handleClose(tag)"
>
    {{ tag.name }}
</el-tag>
<el-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-1 w-20"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
/>
<el-button v-else class="button-new-tag ml-1" @click="showInput">
    + 新栏目
</el-button>
</template>
