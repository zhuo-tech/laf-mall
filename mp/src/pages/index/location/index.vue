<template>
  <view>
    <view class="box">
      <view>
        <img class="img" src="../../../static/img/queshengtu.png" alt="" />
      </view>
      <view style="color: #bab8b9">尚未添加地址...</view>

      <view @click="Goaddlocation" class="but-box">
        <view class="but">
          <uni-icons color="#fff" type="location" size="30"></uni-icons>
          <view class="add">添加地址</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";

function Goaddlocation() {
  uni.navigateTo({
    url: "/pages/index/location/addlocation",
  });
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  text-align: center;
  .img {
    width: 100%;
    height: 800rpx;
  }
  .but-box {
    position: fixed;
    bottom: 20rpx;
    left: 74rpx;
    width: 600rpx;
    height: 80rpx;
    line-height: 80rpx;
    background-color: #ee5382;
    border-radius: 50rpx;
    .but {
      display: flex;
      width: 200rpx;
      height: 80rpx;
      margin: auto;
      .add {
        color: #fff;
      }
    }
  }
}
</style>
