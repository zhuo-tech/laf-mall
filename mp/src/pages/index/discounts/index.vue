<template>
  <view>
    <view v-for="item in 5" class="box">
      <view>
        <img class="img" src="../../../static/icon/yhq.png" alt="" />
      </view>
      <view class="title"> 订单满100可用 </view>
      <view class="time">2021.01.08-2022.08.08</view>
      <view class="price">￥10</view>
      <view class="type">通用券</view>
      <view class="but">立即领取</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  width: 710rpx;
  height: 166rpx;
  margin: 20rpx;
  .img {
    width: 710rpx;
    height: 157rpx;
  }
  .title {
    font-size: 28rpx;
    position: absolute;
    top: 20rpx;
    left: 20rpx;
    color: #fff;
  }
  .time {
    position: absolute;
    bottom: 34rpx;
    left: 10rpx;
    font-size: 24rpx;
    color: #ee5382;
  }
  .price {
    position: absolute;
    color: #fff;
    top: 30rpx;
    right: 100rpx;
    font-size: 40rpx;
  }
  .type {
    position: absolute;
    top: 26rpx;
    right: 0rpx;
    font-size: 26rpx;
    color: #fff;
    transform: rotate(45deg);
  }
  .but {
    position: absolute;
    bottom: 24rpx;
    right: 30rpx;
    width: 150rpx;
    height: 46rpx;
    font-size: 26rpx;
    line-height: 46rpx;
    border-radius: 50rpx;
    text-align: center;
    color: #fff;
    border: 1rpx solid #fff;
  }
}
</style>
