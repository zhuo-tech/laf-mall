<script lang="ts" setup>
import { Delete, Edit, Warning } from '@element-plus/icons-vue'

const emits = defineEmits<{
    (event: 'edit'): void
    (event: 'del'): void
}>()

const props = withDefaults(
    defineProps<{
        showEdit?: boolean
        showDel?: boolean
    }>(),
    {
        showEdit: true,
        showDel: true,
    },
)

</script>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->
<template>
<!--suppress JSValidateTypes -->
<el-button v-if="showEdit" :icon="Edit" link @click="emits('edit')">编辑</el-button>
<el-divider v-if="showEdit" direction="vertical" />
<!--suppress JSValidateTypes -->
<el-popconfirm
    v-if="showDel"
    :icon="Warning"
    cancel-button-text="手滑了"
    confirm-button-text="确认删除"
    icon-color="red"
    title=" 操作无法撤销, 确定要删除吗 ？"
    @confirm="emits('del')"
>
    <template #reference>
        <!--suppress JSValidateTypes -->
        <el-button :icon="Delete" link>删除</el-button>
    </template>
</el-popconfirm>
</template>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->
<style lang="sass" scoped>

</style>
