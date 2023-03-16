<script lang="ts" setup>
import PageHeader from './PageHeader.vue'</script>

<template>
<main>
    <header>
        <PageHeader />
    </header>
    <section class="body">
        <slot name="default"></slot>
    </section>
    <footer>
        <slot name="footer"></slot>
    </footer>
</main>
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

    > footer
        min-height: 200px
        text-align: center
</style>
