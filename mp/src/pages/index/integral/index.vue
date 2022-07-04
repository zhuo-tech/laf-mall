<template>
  <view>
    <view class="title">
      <img class="title-img" src="../../../static/img/qdimg.png" alt="" />
      <view class="titile-box"
        ><img class="title-imgs" src="../../../static/img/qiandaoimg.png" alt=""
      /></view>
    </view>
    <view class="tab">
      <view class="middle">
        <img class="middle-ico" src="../../../static/icon/qiandao.png" alt="" />
        <view class="middle-name">每日签到</view>
      </view>
      <view class="middle">
        <img class="middle-ico" src="../../../static/icon/jifen.png" alt="" />
        <view class="middle-name">我的积分</view>
      </view>
      <view class="middle">
        <img class="middle-ico" src="../../../static/icon/duihuan.png" alt="" />
        <view class="middle-name">兑换记录</view>
      </view>
    </view>
    <view class="name">好礼兑换</view>
    <view v-for="item in 4" class="present">
      <view><img class="present-img" src="../../../static/img/3.jpg" alt="" /></view>
      <view class="present-right">
        <view class="present-name"> 我是如此的相信 </view>
        <view class="tag">限量500份</view>
        <view class="present-number">234已兑换</view>
        <view class="present-bott">
          <view class="integral">675积分</view>
          <view class="but">立即兑换</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  .title-img {
    width: 100%;
    height: 340rpx;
  }
  .titile-box {
    position: absolute;
    top: 70rpx;
    left: 26rpx;
    width: 700rpx;
    height: 320rpx;
    .title-imgs {
      width: 700rpx;
      height: 320rpx;
    }
  }
}
.tab {
  display: flex;
  justify-content: space-around;
  margin: 120rpx 0 30px 0;
  padding: 0 20rpx;
  .middle {
    .middle-ico {
      width: 110rpx;
      height: 86rpx;
    }
    .middle-name {
      width: 120rpx;
      height: 50rpx;
      text-align: center;
      line-height: 50rpx;
      font-size: 26rpx;
    }
  }
}
.name {
  font-size: 32rpx;
  margin: 0 0 30rpx 20rpx;
  font-weight: 700;
}
.present {
  display: flex;
  padding: 20rpx 20rpx;
  .present-img {
    border-radius: 20rpx;
    width: 200rpx;
    height: 200rpx;
  }
  .present-right {
    margin-left: 20rpx;
    .present-name {
      font-size: 32rpx;
      margin-top: 5rpx;
    }
    .tag {
      width: 130rpx;
      height: 35rpx;
      text-align: center;
      border: 1rpx solid #ef648e;
      border-radius: 10rpx;
      font-size: 20rpx;
      color: #ef648e;
      margin-top: 20rpx;
    }
    .present-number {
      margin-top: 10rpx;
      width: 150rpx;
      font-size: 20rpx;
      color: #bebebe;
    }
    .present-bott {
      width: 480rpx;
      display: flex;
      justify-content: space-between;
      .integral {
        margin-top: 10rpx;
        width: 130rpx;
        font-size: 32rpx;
        color: #ef648e;
      }
      .but {
        line-height: 50rpx;
        text-align: center;
        width: 170rpx;
        height: 50rpx;
        margin-top: 10rpx;
        font-size: 30rpx;
        border-radius: 50rpx;
        background-color: #fad3df;
        color: #ef648e;
      }
    }
  }
}
</style>
