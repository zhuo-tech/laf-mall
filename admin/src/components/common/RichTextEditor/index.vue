<script lang="ts" setup>
import { RichTextEditor } from '@/components'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

/**
 * 富文本编辑器
 * 必须使用 v-model:value
 *
 * @author 冰凝
 * @date 2022-07-08 上午 11:18
 **/
const props = defineProps({
    value: {
        type: String,
        default: '',
    },
    height: {
        type: String,
        default: '500px',
    },
    placeholder: {
        type: String,
        default: '请输入...',
    },
    maxLength: {
        type: Number,
        default: 3000,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits<{
    (event: 'update:value', value: string): void
}>()

const {
    editorConfig, toolbarConfig, mode, htmlValue, editorRef,
    handleCreated, onChange, onBlur, onFocus, onMaxLength,
} = new RichTextEditor(props, emits)
</script>

<template>
<div class="rich-text-editor-wrapper">
    <Toolbar
        v-if="!readonly"
        :defaultConfig="toolbarConfig"
        :editor="editorRef"
        :mode="mode"
        class="toolbar"
    />

    <Editor
        v-model="htmlValue"
        :defaultConfig="editorConfig"
        :mode="mode"
        class="editor-content"
        @onBlur="onBlur"
        @onChange="onChange"
        @onCreated="handleCreated"
        @onFocus="onFocus"
        @onMaxLength="onMaxLength"
    />
</div>
</template>

<style lang="sass" scoped>
.rich-text-editor-wrapper
    --rich-text-editor-height: v-bind('height')

.rich-text-editor-wrapper
    border: 1px solid #ccc
    width: 100%

.toolbar
    border-bottom: 1px solid #ccc

.editor-content
    height: var(--rich-text-editor-height) !important
</style>
