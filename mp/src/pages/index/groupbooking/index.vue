<template>
  <view>
    <view class="bgc-box">
      <view class="bgc-box">
        <img class="bgc" src="../../../static/img/pintuanbgc.png" alt="" />
        <view> <img class="pintuan" src="../../../static/img/pintuan.png" alt="" /></view>
        <view> <img class="product" src="../../../static/img/1.png" alt="" /></view>
      </view>
      <view class="cut-off">
        <img class="cut-offrule" src="../../../static/img/ptzq.png" alt="" />
      </view>
    </view>
    <view v-for="item in 3" class="centre">
      <view class="centre-left">
        <view class="product-box">
          <view class="left-ico-box"> </view>
          <img class="left-ico" src="../../../static/img/3.jpg" alt="" />
          <view class="countdown-box">
            <view style="width: 100rpx; line-height: 35rpx">距结束</view>
            <uni-countdown
              class="countdown"
              color="#fff"
              splitorColor="#fff"
              :day="1"
              :hour="1"
              :minute="12"
              :second="40"
            ></uni-countdown
          ></view>
        </view>
        <view class="cnetre-right">
          <view class="centre-name">如此美清润乳</view>
          <view class="tag">
            <view class="tag-right">持久保湿</view>
            <view class="tag-right">贴心呵护</view>
          </view>
          <view class="triangle-box">
            <img class="triangle" src="../../../static/img/sj.png" alt="" />
          </view>

          <view class="atpresent-box">
            <img class="atpresent" src="../../../static/img/jiant.png" alt="" />
          </view>
          <view class="group-box">
            <view class="group">拼团</view>
            <view class="group">1280</view>
          </view>
          <view class="history-box">
            <view class="history">￥2999</view>
            <view class="history">￥2999</view>
          </view>

          <view class="begin-box">
            <view class="begin-left">￥1280 拼团价</view>
            <view class="begin-right">去开团 ></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
</script>

<style lang="scss" scoped>
.bgc-box {
  position: relative;
  .bgc {
    width: 100%;
    height: 600rpx;
  }
  .pintuan {
    position: absolute;
    top: 0rpx;
    left: 180rpx;
    width: 400rpx;
    height: 200rpx;
  }
  .product {
    position: absolute;
    top: 210rpx;
    left: 24rpx;
    width: 700rpx;
    height: 350rpx;
  }
  .cut-off {
    margin: auto;
    width: 550rpx;
    height: 47rpx;
    .cut-offrule {
      width: 550rpx;
      height: 47rpx;
    }
  }
}
.centre {
  margin-top: 30rpx;
  padding: 0 20rpx;
  height: 390rpx;
  border-bottom: 1rpx solid #e7e3e3;
  .centre-left {
    display: flex;
    .product-box {
      position: relative;
      .left-ico-box {
        margin-right: 20rpx;
        width: 300rpx;
        height: 360rpx;
        background-color: #303030;
      }
      .left-ico {
        position: absolute;
        top: 15rpx;
        left: 25rpx;
        width: 250rpx;
        height: 275rpx;
      }

      .countdown-box {
        position: absolute;
        bottom: 10rpx;
        left: 5rpx;
        display: flex;
        font-size: 30rpx;
        color: #fff;
        .countdown {
          width: 180rpx;
        }
      }
    }
  }
  .cnetre-right {
    position: relative;
    .centre-name {
      text-align: center;
      width: 400rpx;
      font-size: 30rpx;
      font-weight: 700;
      margin-bottom: 10rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tag {
      display: flex;
      margin-bottom: 10rpx;
      .tag-right {
        font-size: 24rpx;
        text-align: center;
        width: 120rpx;
        height: 40rpx;
        color: #989898;
        border: 1rpx solid #989898;
        border-radius: 50rpx;
        margin-left: 50rpx;
      }
    }
    .triangle-box {
      .triangle {
        width: 400rpx;
        height: 130rpx;
      }
    }
    .atpresent-box {
      position: absolute;
      top: 95rpx;
      left: 135rpx;
      .atpresent {
        width: 130rpx;
        height: 110rpx;
      }
    }
    .group-box {
      position: absolute;
      top: 120rpx;
      left: 150rpx;
      .group {
        text-align: center;
        width: 100rpx;
        color: #fff;
        font-size: 24rpx;
      }
    }
    .history-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10rpx;
      .history {
        margin-right: 10rpx;
        color: #989898;
        font-size: 26rpx;
        text-decoration: line-through;
      }
    }
    .begin-box {
      display: flex;
      .begin-left {
        text-align: center;
        line-height: 72rpx;
        width: 250rpx;
        height: 72rpx;
        color: #fff;
        background-color: #303030;
      }
      .begin-right {
        width: 160rpx;
        height: 72rpx;
        background-color: #ef5e8a;
        text-align: center;
        color: #fff;
        line-height: 72rpx;
      }
    }
  }
}
</style>
