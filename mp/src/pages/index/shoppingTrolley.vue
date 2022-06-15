<template>
  <view class="page">
    <view class="head">
      <view style="margin-left: 30rpx"
        >购物数量 <span style="color: #ee5382">3</span></view
      >
      <view class="but">取消</view>
    </view>
    <view class="entry">
      <view class="text">
        <uni-icons type="checkbox" size="17" color="#8f8787"></uni-icons>
        <view> 100%正品保证</view>
      </view>
      <view class="text">
        <uni-icons type="checkbox" size="17" color="#8f8787"></uni-icons>
        <view> 所有商品精挑细选</view>
      </view>
      <view class="text">
        <uni-icons type="checkbox" size="17" color="#8f8787"></uni-icons>
        <view> 售后无忧</view>
      </view>
    </view>
    <view v-for="(item, index) in 3" class="goods">
      <view style="display: flex">
        <view class="checkbox">
          <checkbox style="transform: scale(0.7)" value="cb" color="#979494"
        /></view>
        <img class="goods-img" src="../../static/img/3.jpg" alt="" />
        <view style="margin-left: 20rpx">
          <view class="goods-name">风萧萧兮</view>
          <view class="goods-price">￥1280</view>
        </view>
        <view class="anumber">
          <uni-number-box></uni-number-box>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="a">
        <checkbox style="transform: scale(0.7)" value="cb" color="#979494" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  background-color: #fbfbfb;
  .head {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    background-color: #fffeff;
    .but {
      margin: 15rpx 20rpx 0 0;
      width: 120rpx;
      height: 55rpx;
      line-height: 55rpx;
      background-color: #ee5382;
      text-align: center;
      font-size: 28rpx;
      color: #fdfbfb;
      border-radius: 10rpx;
    }
  }
  .entry {
    margin-top: 1rpx;
    display: flex;
    justify-content: space-around;
    background-color: #fffeff;
    width: 100%;
    height: 80rpx;
    .text {
      display: flex;
      line-height: 80rpx;
      color: #8f8787;
      font-size: 24rpx;
    }
  }
  .goods {
    position: relative;
    width: 710rpx;
    height: 185rpx;
    background-color: #fffeff;
    margin: 20rpx;
    border-radius: 20 rpx;
    .checkbox {
      margin: 60rpx 0 0 20rpx;
    }
    .goods-img {
      margin-top: 30rpx;
      width: 132rpx;
      height: 121rpx;
    }
    .goods-name {
      font-size: 28rpx;
      color: #8f8787;
      line-height: 50px;
    }
    .goods-price {
      line-height: 50rpx;
      color: #ee5382;
      font-size: 30rpx;
      text-align: center;
    }
    .anumber {
      position: absolute;
      left: 490rpx;
      top: 100rpx;
    }
  }
  .bottom {
    position: fixed;
    bottom: 105rpx;
    width: 100%;
    height: 88rpx;
    background-color: #fffeff;
  }
}
</style>
