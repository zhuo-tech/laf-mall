<script lang="ts" setup>
import MultiSpecForm from '@/pages/Basic/Product/components/MultiSpecForm.vue'
import SingleSpecForm from '@/pages/Basic/Product/components/SingleSpecForm.vue'
import { SpecType } from 'common'

const props = defineProps<{ specType: SpecType }>()

</script>

<template>
<el-collapse-transition appear>
    <SingleSpecForm v-if="specType === SpecType.SingleSpec" />
    <MultiSpecForm v-if="specType === SpecType.MultipleSpec" />
</el-collapse-transition>
</template>
