<script lang="ts" setup>
import ShowImage from '@/components/Show/ShowImage.vue'
import LoginForm from '@/pages/Login/components/LoginForm.vue'

</script>

<template>
<div class="login-wrapper">
    <div class="propaganda light-black-shadow gradual-change">
        <div class="info width-height-100">
            <div class="title">
                <ShowImage src="/logo.jpg" style="width: 100px;height: 100px; position: relative; left: 50%; transform: translateX(-50%)" />
                <br>
                <h1 style="font-size: 30px; font-weight: bold; line-height: 50px">LAF Mall Admin</h1>
                <h3>Vue + Vite + Typescript + LAF Cloud</h3>
            </div>
            <div class="footer">
                LAF Mall Admin 1.0.0 - Made by ZhuoZhuo
            </div>
        </div>
    </div>
    <div class="context gradual-change">
        <LoginForm class="form-container centering light-black-shadow" />
    </div>
</div>
</template>
<style lang="sass">
.login-wrapper
    --login-propaganda-flex-grow: 1
    --login-context-flex-grow: 3
</style>
<style lang="sass" scoped src="./Login.sass" />
