<template>
  <view class="page">
    <view class="head">
      <view style="margin-left: 40rpx"
        >购物数量 <span style="color: #ee5382">3</span></view
      >
      <view @click="ChooseRedact" v-show="redact == false" class="but">取消</view>
      <view @click="ChooseRedact" v-show="redact == true" class="but">管理</view>
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
          <checkbox-group @change="checkboxChange(index)">
            <label>
              <checkbox
                :checked="checked"
                style="transform: scale(0.7)"
                :value="item"
                color="#ee5382"
              />
            </label>
          </checkbox-group>
        </view>
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
      <view class="checkbox">
        <checkbox-group @change="all">
          <checkbox
            :checked="checkedall"
            style="transform: scale(0.7)"
            value="cb"
            color="#ee5382"
          />
        </checkbox-group>
        <view v-show="redact == false" class="checkall">全选</view>
        <view v-show="redact == true" class="checkall-in">合计:￥0</view>
      </view>
      <view v-show="redact == false" class="del">删除</view>
      <view v-show="redact == true" class="order">立即下单</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue";

const checked = ref(false);
const checkedall = ref(false);
const redact = ref(true);

function ChooseRedact() {
  redact.value = !redact.value;
}

function checkboxChange(index: any) {
  console.log(index, "现在点击的");
}

function all() {
  checked.value = !checked.value;
  checkedall.value = !checkedall.value;
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;

  .head {
    margin-top: 20rpx;
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
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 95rpx;
    width: 100%;
    height: 120rpx;
    background-color: #fffeff;
    .checkbox {
      display: flex;
      margin: 40rpx 0 0 20rpx;
      .checkall {
        font-size: 30rpx;
        color: #707070;
        line-height: 45rpx;
      }
      .checkall-in {
        font-size: 30rpx;
        color: #ee5382;
        line-height: 45rpx;
      }
    }
    .del {
      margin: 35rpx 20rpx 0 0;
      width: 165rpx;
      height: 48rpx;
      border: 1px solid #707070;
      border-radius: 10px;
      text-align: center;
      line-height: 48rpx;
      color: #a7a7a7;
    }
    .order {
      background-color: #ee5382;
      margin: 25rpx 20rpx 0 0;
      width: 200rpx;
      height: 60rpx;
      border: 1px solid #ee5382;
      border-radius: 20px;
      text-align: center;
      line-height: 60rpx;
      color: #fff;
    }
  }
}
</style>
