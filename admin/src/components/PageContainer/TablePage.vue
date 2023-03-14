<script lang="ts" setup>
import PageHeader from '@/components/PageContainer/PageHeader.vue'
import { CirclePlusFilled, Refresh, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const emits = defineEmits<{
    (event: 'create'): void
    (event: 'refresh'): void
}>()

const showQuery = ref(false)

</script>

<template>
<div>
    <main>
        <header>
            <PageHeader />
        </header>
        <section class="body">
            <el-collapse-transition>
                <div v-show="showQuery">
                    <slot name="searchForm"></slot>
                </div>
            </el-collapse-transition>

            <el-col :span="24">
                <el-row justify="end" type="flex">
                    <slot name="action"></slot>
                    <!--suppress JSValidateTypes -->
                    <el-button :icon="CirclePlusFilled" type="primary" @click="emits('create')">新建</el-button>
                    <!--suppress JSValidateTypes -->
                    <el-button v-if="!!$slots.searchForm" :icon="Search" type="primary" @click="showQuery = !showQuery" />
                    <!--suppress JSValidateTypes -->
                    <el-button :icon="Refresh" type="primary" @click="emits('refresh')" />
                </el-row>
            </el-col>

            <div class="table-wrapper">
                <slot name="default"></slot>
            </div>
        </section>
    </main>

    <footer>
        <slot name="footer"></slot>
    </footer>
</div>
</template>

<style lang="sass" scoped>
main
    box-sizing: border-box
    max-width: 1920px
    margin: 0 auto
    padding: 0 70px 0 20px

    background-color: var(--el-bg-color)

    > header
        padding: 30px
        margin-bottom: 10px
        border-bottom: rgba(0, 0, 0, .1)

    > .body
        box-sizing: border-box
        min-height: 80vh

        .table-wrapper
            padding-top: 20px

    > footer
        min-height: 200px
        text-align: center
</style>
