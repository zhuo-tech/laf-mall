<template>
  <view class="box">
    <view class="login">
      <view class="hint"> 为了提供更好的服务，请先登录 </view>
      <view @click="GoLogin" class="login-hint"> 去登录 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";

function GoLogin() {
  uni.navigateTo({
    url: "/pages/index/login/index",
  });
}
</script>

<style lang="scss" scoped>
.box {
  .login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 650rpx;
    height: 200rpx;
    border-radius: 50rpx;
    .hint {
      margin: auto;
      width: 450rpx;
      height: 50rpx;
      text-align: center;
      margin-bottom: 60rpx;
    }
    .login-hint {
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
