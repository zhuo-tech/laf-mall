<template>
  <view>
    <view class="img-box">
      <view v-show="select == 0">
        <img class="img" src="../../../static/img/3.jpg" alt="" />
      </view>
      <view v-show="select == 1">
        <img class="img" src="../../../static/img/2.jpg" alt="" />
      </view>
      <view v-show="select == 2">
        <img class="img" src="../../../static/img/1.png" alt="" />
      </view>
    </view>

    <view class="mid">
      <view class="middle">
        <view class="title">请选择会员套餐</view>
        <view class="setmeal-box">
          <view @click="changgesetmeal(0)" :class="select == 0 ? 'select' : 'setmeal'">
            <view class="setmeal-name"> 黄金会员 </view>
            <view class="setmeal-price">￥99</view>
            <view class="underline"></view>
            <view class="discount">商品享受9.5折优惠</view>
          </view>
          <view @click="changgesetmeal(1)" :class="select == 1 ? 'select' : 'setmeal'">
            <view class="setmeal-name"> 铂金会员 </view>
            <view class="setmeal-price">￥199</view>
            <view class="underline"></view>
            <view class="discount">商品享受9折优惠</view>
          </view>
          <view @click="changgesetmeal(2)" :class="select == 2 ? 'select' : 'setmeal'">
            <view class="setmeal-name"> 钻石会员 </view>
            <view class="setmeal-price">￥299</view>
            <view class="underline"></view>
            <view class="discount">商品享受8折优惠</view>
          </view>
        </view>
      </view>
    </view>

    <view class="pay-box">
      <view style="display: flex">
        <img class="wx" src="../../../static/icon/wx.png" alt="" />
        <view class="wxpay">微信支付</view>
      </view>
      <view>
        <img class="gou" src="../../../static/icon/gou.png" alt="" />
      </view>
    </view>

    <view class="bottom-but">立即开通</view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue";
const select = ref(0);

function changgesetmeal(e: number) {
  select.value = e;
}
</script>

<style lang="scss" scoped>
.img-box {
  height: 470rpx;
  display: flex;
  justify-content: space-around;
  .img {
    margin-top: 30rpx;
    width: 700rpx;
    height: 400rpx;
    border-radius: 25rpx;
  }
}
.mid {
  height: 430rpx;
  background-color: #f5f5f5;
  padding: 25rpx;
  .middle {
    width: 700rpx;
    height: 430rpx;
    background-color: #fff;
    border-radius: 30rpx;
    .title {
      width: 300rpx;
      height: 50rpx;
      margin-left: 30rpx;
      padding-top: 20rpx;
      font-size: 30rpx;
      font-weight: 700;
      margin-bottom: 20rpx;
    }
    .setmeal-box {
      display: flex;
      justify-content: space-around;
      .setmeal {
        width: 210rpx;
        height: 300rpx;
        background-color: #f5f5f5;
        border-radius: 30rpx;
        text-align: center;
        border: 1rpx solid #f5f5f5;
        .setmeal-name {
          margin: 30rpx 0 50rpx 0;
          font-size: 30rpx;
        }
        .setmeal-price {
          font-size: 30rpx;
        }
        .underline {
          width: 100rpx;
          height: 20rpx;
          background-color: #e1dfdf;
          margin: auto;
          border-radius: 10rpx;
          margin-top: 20rpx;
        }
        .discount {
          color: #7e7b7b;
          margin-top: 20rpx;
          font-size: 20rpx;
        }
      }
      .select {
        width: 210rpx;
        height: 300rpx;
        background-color: #ffe5ed;
        border-radius: 30rpx;
        text-align: center;
        border: 1rpx solid #f16e96;
        .setmeal-name {
          margin: 30rpx 0 50rpx 0;
          font-size: 30rpx;
        }
        .setmeal-price {
          font-size: 30rpx;
        }
        .underline {
          width: 100rpx;
          height: 20rpx;
          background-color: #fff;
          margin: auto;
          border-radius: 10rpx;
          margin-top: 20rpx;
        }
        .discount {
          color: #7e7b7b;
          margin-top: 20rpx;
          font-size: 20rpx;
        }
      }
    }
  }
}

.pay-box {
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  .wx {
    width: 48rpx;
    height: 40rpx;
  }
  .wxpay {
    font-size: 30rpx;
    margin-left: 20rpx;
  }
  .gou {
    width: 40rpx;
    height: 40rpx;
  }
}

.bottom-but {
  margin: auto;
  width: 660rpx;
  height: 80rpx;
  margin-top: 50rpx;
  background-color: #ee5382;
  text-align: center;
  line-height: 80rpx;
  color: #fff;
  border-radius: 50rpx;
}
</style>
