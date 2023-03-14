<script lang="ts" setup>
import { LoginForm } from '@/pages/Login/components/LoginForm'

const { isLoading, formData, submit, setFormRef, formRule, refs } = new LoginForm()
</script>

<template>
<div>
    <h1 style="font-size: 30px; margin-bottom: 20px">用户登录</h1>
    <el-form :ref="setFormRef" v-loading="isLoading" :model="formData" :rules="formRule">
        <el-form-item prop="username">
            <el-input
                :ref="el => refs.username = el"
                v-model="formData.username"
                placeholder="用户名"
            />
        </el-form-item>
        <el-form-item prop="password">
            <el-input
                :ref="el => refs.password = el"
                v-model="formData.password"
                placeholder="密码"
                type="password"
            />
        </el-form-item>
        <!--<el-form-item v-show="showNext.password" prop="verificationCode">-->
        <!--    <el-input :ref="el => refs.code = el"-->
        <!--              v-model="formData.verificationCode"-->
        <!--              placeholder="验证码"-->
        <!--              style="width: 50%; "-->
        <!--              @blur="next('verificationCode')"-->
        <!--              v-on:keyup.enter="next('verificationCode')" />-->
        <!--</el-form-item>-->
        <el-form-item>
            <el-button style="width: 100%;" @click="submit">登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
