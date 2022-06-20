<script lang="ts" setup>
import { LoginForm } from '@/pages/Login/components/LoginForm'

const {isLoading, formData, submit, form, formRule, showNext, next, refs} = new LoginForm()
</script>

<template>
<div>
    <h1 style="font-size: 30px; margin-bottom: 20px">用户登录</h1>
    <el-form :ref="el => {if(el) {form = el}}" v-loading="isLoading" :model="formData" :rules="formRule">
        <el-form-item prop="username">
            <el-input :ref="el => refs.username = el"
                      v-model="formData.username"
                      placeholder="用户名"
                      @blur="next('username')"
                      v-on:keyup.enter="next('username')" />
        </el-form-item>
        <el-form-item v-show="showNext.username" prop="password">
            <el-input :ref="el => refs.password = el"
                      v-model="formData.password"
                      placeholder="密码"
                      type="password"
                      @blur="next('password')"
                      v-on:keyup.enter="next('password')" />
        </el-form-item>
        <!--<el-form-item v-show="showNext.password" prop="verificationCode">-->
        <!--    <el-input :ref="el => refs.code = el"-->
        <!--              v-model="formData.verificationCode"-->
        <!--              placeholder="验证码"-->
        <!--              style="width: 50%; "-->
        <!--              @blur="next('verificationCode')"-->
        <!--              v-on:keyup.enter="next('verificationCode')" />-->
        <!--</el-form-item>-->
        <el-form-item v-show="showNext.password">
            <el-button style="width: 100%;" @click="submit">登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
