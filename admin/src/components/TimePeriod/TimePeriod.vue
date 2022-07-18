<script lang="ts" setup>
import { ref, watch } from 'vue'

/**
 * TimePeriod
 * 时间段选择, 格式化值
 * props 透传至 el-date-picker
 * @see https://element-plus.org/zh-CN/component/datetime-picker.html#%E6%97%A5%E6%9C%9F%E5%92%8C%E6%97%B6%E9%97%B4%E8%8C%83%E5%9B%B4
 * @author 冰凝
 * @date 2022-07-11 12:27:01
 **/

type TimeValueType = string | number | undefined

const props = defineProps<{
    start?: TimeValueType
    end?: TimeValueType
}>()
const emits = defineEmits<{
    (event: 'update', value: [TimeValueType, TimeValueType]): void
    (event: 'update:start', value: TimeValueType): void
    (event: 'update:end', value: TimeValueType): void
}>()


const data = ref<[TimeValueType, TimeValueType]>([props.start, props.end])

watch(() => props.start, () => data.value[0] = props.start)
watch(() => props.end, () => data.value[1] = props.end)

watch(() => data.value, () => {
    const [start, end] = data.value as any

    // noinspection SuspiciousTypeOfGuard
    if (start instanceof Date) {
        data.value[0] = start.getTime()
    }
    if (end instanceof Date) {
        data.value[1] = end.getTime()
    }

    processEmit(data.value)
})

const processEmit = (tp: [TimeValueType, TimeValueType]) => {
    emits('update', tp)
    emits('update:start', tp?.[0])
    emits('update:end', tp?.[1])
}

</script>

<template>
<el-date-picker v-model="data"
                end-placeholder="结束日期"
                range-separator="至"
                start-placeholder="开始日期"
                type="datetimerange"
                v-bind="$attrs"/>
</template>

<style lang="sass" scoped>

</style>
