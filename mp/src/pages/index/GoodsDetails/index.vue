<template>
  <view class="box">
    <view style="position: relative">
      <swiper class="swiper">
        <swiper-item>
          <img class="slideshow" src="../../../static/img/3.jpg" alt="" />
        </swiper-item>
      </swiper>
      <view class="pages">1/1</view>
    </view>

    <view class="content">
      <view class="content-name">糖果罐里好多颜色</view>
      <view class="content-price"> ￥1888 </view>
      <view class="quantity">
        <view class="store">库存999</view>
        <view class="sell">销量100</view>
      </view>
      <view class="sale">
        <view>优惠券：</view>
        <view class="sale-img-box"
          ><img class="sale-img" src="../../../static/icon/sale.png" alt="" />
        </view>
        <uni-icons class="arrows" color="#787878" type="forward" size="28"></uni-icons>
      </view>
    </view>
    <view class="freight-box">
      <view class="freight"
        >运费：<span style="font-weight: 700; color: #000">免运费</span>
      </view>
    </view>
    <view class="select-box">
      <view class="select"
        >已选择：<span style="font-weight: 700; color: #000">默认</span>
        <uni-icons class="arrows" color="#787878" type="forward" size="28"></uni-icons>
      </view>
    </view>

    <view class="evaluate-box">
      <view class="evaluate-left"></view>
      <view class="evaluate"> 用户评价(0) </view>
      <view class="good">
        0%<span style="color: #787878">好评率</span>
        <uni-icons class="arrows" color="#787878" type="forward" size="28"></uni-icons>
      </view>
    </view>
    <view class="product">
      <view class="product-text">产品介绍</view>
      <view class="product-img">
        <img class="product-imgs" src="../../../static/img/1.png" alt="" />
        <img class="product-imgs" src="../../../static/img/2.jpg" alt="" />
      </view>
    </view>
    <view class="goods-nav">
      <uni-goods-nav
        :fill="true"
        :options="options"
        :buttonGroup="buttonGroup"
        @click="onClick"
        @buttonClick="buttonClick"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";

const options = reactive([
  {
    icon: "home",
    text: "首页",
  },
  {
    icon: "heart",
    text: "收藏",
    info: 0,
  },
  {
    icon: "cart",
    text: "购物车",
    info: 0,
  },
]);

function onClick(e: any) {
  uni.showToast({
    title: `${e.content.text}`,
    icon: "none",
  });
  if (e.index === 0) {
    GotoHome();
  }
}

function GotoHome() {
  uni.switchTab({
    url: "/pages/index/index",
  });
}
</script>

<style lang="scss" scoped>
.box {
  background-color: #f5f5f5;
  width: 100%;
  height: 100vh;
  .swiper {
    height: 500rpx;
    .slideshow {
      width: 100%;
    }
  }
  .pages {
    width: 80rpx;
    text-align: center;
    position: absolute;
    bottom: 30rpx;
    right: 30rpx;
    background-color: #fff;
    border-radius: 8rpx;
  }
  .content {
    padding-top: 30rpx;
    background-color: #fff;
    .content-name {
      padding: 0 30rpx;
      font-size: 40rpx;
      font-weight: 700;
      margin-bottom: 50rpx;
    }
    .content-price {
      padding: 0 30rpx;
      font-size: 35rpx;
      font-weight: 700;
      color: #ee5382;
    }
    .quantity {
      width: 100%;
      height: 70rpx;
      margin-top: 40rpx;
      border-bottom: 1rpx solid #ebe8e8;
      display: flex;
      justify-content: space-between;
      .store {
        margin-left: 40rpx;
        font-size: 30rpx;
        color: #787878;
      }
      .sell {
        margin-right: 40rpx;
        font-size: 30rpx;
        color: #787878;
      }
    }
    .sale {
      position: relative;
      display: flex;
      margin-left: 40rpx;
      height: 90rpx;
      line-height: 90rpx;
      font-size: 32rpx;
      color: #787878;
      .sale-img-box {
        margin-top: 5rpx;
        width: 40rpx;
        height: 31rpx;
        .sale-img {
          width: 45rpx;
          height: 35rpx;
        }
      }
      .arrows {
        position: absolute;
        right: 20rpx;
      }
    }
  }
  .freight-box {
    margin-top: 20rpx;
    background-color: #fff;
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    .freight {
      margin-left: 40rpx;
      font-size: 32rpx;
      color: #787878;
    }
  }
  .select-box {
    margin-top: 20rpx;
    background-color: #fff;
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    .select {
      position: relative;
      margin-left: 40rpx;
      font-size: 32rpx;
      color: #787878;
      .arrows {
        position: absolute;
        right: 20rpx;
      }
    }
  }
  .evaluate-box {
    position: relative;
    display: flex;
    margin-top: 20rpx;
    background-color: #fff;
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    .evaluate-left {
      margin-top: 25rpx;
      margin-left: 40rpx;
      width: 10rpx;
      height: 40rpx;
      border-radius: 25rpx;
      background-color: #fd8629;
    }
    .evaluate {
      margin-left: 10rpx;
      font-size: 32rpx;
    }
    .good {
      margin-left: 250rpx;
      color: #ee5382;
      font-size: 32rpx;
    }
    .arrows {
      position: absolute;
      right: 20rpx;
    }
  }
  .goods-nav {
    width: 100%;
    position: fixed;
    bottom: 0rpx;
  }
  .product {
    .product-text {
      margin-top: 20rpx;
      width: 100%;
      height: 90rpx;
      background-color: #fff;
      text-align: center;
      line-height: 90rpx;
      font-size: 32rpx;
    }
    .product-img {
      width: 100%;
      height: 100%;
      .product-imgs {
        // margin-top: -8rpx;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
