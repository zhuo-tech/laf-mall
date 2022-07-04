<template>
  <view>
    <view class="title">
      <img class="title-img" src="../../../static/img/qdimg.png" alt="" />
      <view class="titile-box"
        ><img class="title-imgs" src="../../../static/img/kanjia.png" alt=""
      /></view>
    </view>

    <view class="name">砍价专区</view>
    <view v-for="item in 6" class="present">
      <view><img class="present-img" src="../../../static/img/3.jpg" alt="" /></view>
      <view class="cost">原价：￥1800</view>
      <view class="present-right">
        <view class="present-name"> 我是如此的相信 </view>
        <view class="present-number">39人正在参与</view>
        <view class="present-bott">
          <view class="integral">可砍至</view>
          <view class="integral-pirce">￥1200</view>
          <view class="but">
            <view>
              <img class="but-ico" src="../../../static/icon/kanjiaico.png" alt=""
            /></view>
            <view class="but-text">参与砍价</view>
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

.name {
  font-size: 32rpx;
  margin: 100rpx 0 30rpx 20rpx;
  font-weight: 700;
}
.present {
  position: relative;
  display: flex;
  padding: 20rpx 20rpx;
  .present-img {
    border-radius: 20rpx;
    width: 200rpx;
    height: 200rpx;
  }
  .cost {
    border-radius: 0 20rpx 0 20rpx;
    background-color: #444141;
    bottom: 27rpx;
    font-size: 20rpx;
    color: #fff;
    position: absolute;
    width: 160rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
  }
  .present-right {
    margin-left: 20rpx;
    .present-name {
      font-size: 32rpx;
      margin-top: 5rpx;
    }

    .present-number {
      margin-top: 40rpx;
      width: 150rpx;
      font-size: 20rpx;
      color: #bebebe;
    }
    .present-bott {
      width: 480rpx;
      display: flex;
      .integral {
        margin-top: 40rpx;
        width: 100rpx;
        height: 40rpx;
        font-size: 26rpx;
        text-align: center;
        color: #ef648e;
      }
      .integral-pirce {
        font-weight: 700;
        margin-top: 36rpx;
        width: 100rpx;
        height: 40rpx;
        font-size: 30rpx;
        text-align: center;
        color: #ef648e;
      }
      .but {
        position: relative;
        display: flex;
        justify-content: space-between;
        margin-left: 100rpx;
        line-height: 60rpx;
        width: 200rpx;
        height: 60rpx;
        font-size: 24rpx;
        border-radius: 50rpx;
        background-color: #f5618e;
        color: #fff;
        .but-ico {
          position: absolute;
          top: 15rpx;
          left: 25rpx;
          width: 30rpx;
          height: 30rpx;
        }
        .but-text {
          width: 120rpx;
        }
      }
    }
  }
}
</style>
