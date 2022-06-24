<template>
  <view>
    <view v-for="item in 4" class="box">
      <view><img class="img" src="../../../static/img/3.jpg" alt="" /></view>
      <view class="right">
        <view class="name">心随所动</view>
        <view class="bottom">
          <view class="price">￥1980</view>
          <view class="del">删除</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  padding: 20rpx;
  height: 200rpx;
  border: 1rpx solid #ebebeb;
  .img {
    margin-right: 30rpx;
    border-radius: 20rpx;
    width: 200rpx;
    height: 200rpx;
  }
  .name {
    font-size: 32rpx;
  }
  .bottom {
    width: 450rpx;
    margin-top: 100rpx;
    display: flex;
    justify-content: space-between;
    .price {
      font-size: 32rpx;
      color: #ee5382;
    }
    .del {
      line-height: 50rpx;
      font-size: 28rpx;
      width: 120rpx;
      height: 50rpx;
      border: 1rpx solid #bbbbbb;
      text-align: center;
    }
  }
}
</style>
