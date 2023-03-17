<script lang="ts" setup>
import { TagList } from '@/components'
import { BasicSpecRepository } from '@/repository'
import { StandardErrorProcess } from '@/util'
import { ArrayTool } from '@es-tool/core'
import { computed } from '@vue/runtime-core'
import { BasicSpec } from 'common'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
    value?: Array<string>
    spec?: Array<BasicSpec>
    specItem?: Array<BasicSpec['item']>
}>()
const emits = defineEmits<{
    (event: 'update:value', value: Array<string>): void
    (event: 'update:spec', value: Array<BasicSpec>): void
    (event: 'update:specItem', value: BasicSpec['item']): void
    (event: 'change'): void
}>()

const selected = ref<Array<string>>([])
const optionLoading = ref(false)
const specOptions = ref<Array<{ label: string, value: BasicSpec }>>([])
const optionMapping = computed<Record<string, BasicSpec>>(() => ArrayTool.toRecord(specOptions.value, i => i.value._id, i => i.value))

onMounted(() => init())
const onSelectChange = () => {
    emits('update:value', selected.value)
    const specArr = selected.value.map(id => optionMapping.value[id]!)
    emits('update:spec', specArr)
    emits('update:specItem', specArr.flatMap(i => i.item ?? []))
    emits('change')
}

watch(() => props.value, () => {
    if (ArrayTool.isNotEmpty(props.value)) {
        selected.value = props.value!
    }
})
watch(() => props.spec, () => {
    if (ArrayTool.isNotEmpty(props.spec)) {
        selected.value = props.spec!.map(i => i._id)
    }
})
const init = () => {
    optionLoading.value = true
    BasicSpecRepository.API.selectAllOptions()
        .then(list => specOptions.value = list)
        .catch(StandardErrorProcess)
        .finally(() => optionLoading.value = false)
}
</script>

<template>
<el-select-v2
    v-model="selected"
    :options="specOptions"
    clearable
    filterable
    multiple
    value-key="value._id"
    @change="onSelectChange"
>
    <template #default="{item, index, disabled}">
        <div class="item">
            <span>{{ item.label }}</span>
            <span>
                <TagList :value="item.value.item" readonly />
            </span>
        </div>
    </template>

</el-select-v2>
</template>

<style lang="sass" scoped>
.el-select-v2
    min-width: 600px

.item
    > span:first-child
        float: left

    > span:last-child
        float: right
</style>
