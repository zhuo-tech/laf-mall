<template>
  <view>
    <view class="title">
      <view style="display: flex">
        <view @click="cut(0)" :class="index == 0 ? 'select' : 'unselected'">
          快捷登录
        </view>
        <view @click="cut(1)" :class="index == 1 ? 'select' : 'unselected'">
          账号登录
        </view>
      </view>
      <view class="input-box">
        <view class="input">
          <input
            v-model="account"
            type="number"
            maxlength="11"
            placeholder="输入手机号码"
          />
        </view>

        <view class="input-bottom"></view>

        <view v-show="index == 0" class="input">
          <input v-model="accounta" type="text" maxlength="6" placeholder="填写验证码" />
          <view class="code"> 获取验证码 </view>
        </view>
        <view v-show="index == 1" class="input">
          <input
            v-model="account"
            type="password"
            maxlength="16"
            placeholder="填写登录密码"
          />
        </view>
        <view class="input-bottom"></view>
      </view>
      <view class="deal">
        <view style="display: flex">
          <checkbox-group @change="checkboxChange">
            <checkbox
              :checked="checked"
              style="transform: scale(0.7)"
              value="cb"
              color="#ee5382"
            />
          </checkbox-group>
          <view class="deal-page">阅读并同意《登录注册协议》</view>
        </view>
        <view @click="verification" class="login-hint"> 登录 </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue";
import { showTip } from "../../../utils/show";
let tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const account = ref(); //输入的号码
const index = ref(0); //登录方式切换
const checked = ref(false); //判断是否勾选协议

//切换登录方式
function cut(e: number) {
  index.value = e;
}
//判断是否勾选协议
function checkboxChange() {
  checked.value = !checked.value;
}

//验证表单
function verification() {
  if (!tel.test(account.value)) showTip("请输入正确的手机号码");
}
</script>

<style lang="scss" scoped>
.title {
  padding: 150rpx 50rpx 50rpx 50rpx;
  .select {
    margin-right: 60rpx;
    width: 120rpx;
    height: 60rpx;
    border-bottom: 3rpx solid #f01d60;
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 80rpx;
  }
  .unselected {
    margin-right: 60rpx;
    width: 120rpx;
    height: 60rpx;
    border-bottom: 3rpx solid #7a7778;
    font-size: 30rpx;
    font-weight: bold;
    color: #7a7778;
    margin-bottom: 80rpx;
  }
  .input-box {
    position: relative;
    width: 100%;
    .input {
      margin-top: 50rpx;
      width: 100%;
      height: 56rpx;
      // border-bottom: 1rpx solid #7a7778;
      .code {
        position: absolute;
        right: 0rpx;
        top: 105rpx;
        width: 150rpx;
        height: 50rpx;
        font-size: 24rpx;
        color: #fff;
        background-color: #f01d60;
        text-align: center;
        line-height: 50rpx;
        border-radius: 50rpx;
      }
    }
    .input-bottom {
      margin-top: 5rpx;
      width: 100%;
      border-top: 1rpx solid #dddcdc;
    }
  }
  .deal {
    width: 100%;
    margin-top: 100rpx;
    .deal-page {
      font-size: 24rpx;
      line-height: 47rpx;
    }
    .login-hint {
      margin-top: 80rpx;
      width: 650rpx;
      height: 80rpx;
      border-radius: 50rpx;
      background-color: #ee5481;
      text-align: center;
      line-height: 80rpx;
      color: #fff;
    }
  }
}
</style>
