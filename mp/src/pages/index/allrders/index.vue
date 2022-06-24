<template>
  <view class="box">
    <view class="title">
      <view class="info"> 订单信息 </view>
      <view class="orders-statistics">
        <view class="addup">累计订单：0</view>
        <view class="addup">总消费：￥0</view>
      </view>
    </view>

    <view class="freight">
      <view
        @click="each(index)"
        v-for="(item, index) in list"
        :class="recom == index ? 'select' : 'freight-box'"
      >
        <view class="orderinfo">{{ item.name }}</view>
        <view class="number">1</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { isTemplateNode } from "@vue/compiler-core";

const recom = ref(0);

const list = reactive([
  { name: "待付款" },
  { name: "待发货" },
  { name: "待收货" },
  { name: "待评价" },
  { name: "已完成" },
]);

onLoad((opt) => {
  recom.value = Number(opt.id);
});

function each(index: number) {
  recom.value = index;
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  background-color: #f5f5f5;
  width: 100%;
  height: 100vh;
  .title {
    width: 100%;
    height: 300rpx;
    background-color: #ee5382;
    .info {
      padding: 50rpx 0 0 30rpx;
      width: 200rpx;
      height: 80rpx;
      color: #fff;
      font-size: 45rpx;
      font-weight: 700;
    }
    .orders-statistics {
      display: flex;
      .addup {
        margin-left: 30rpx;
        font-size: 32rpx;
        margin-right: 20rpx;
        color: #fcdde6;
      }
    }
  }
  .freight {
    position: absolute;
    display: flex;
    justify-content: space-around;
    top: 220rpx;
    left: 25rpx;
    width: 700rpx;
    height: 150rpx;
    background-color: #fff;
    border-radius: 10rpx;
    .freight-box {
      margin-top: 30rpx;
      .orderinfo {
        font-size: 32rpx;
      }
      .number {
        width: 100rpx;
        text-align: center;
      }
    }
    .select {
      margin-top: 30rpx;
      border-bottom: 4rpx solid #ee5382;
      .orderinfo {
        font-size: 32rpx;
        font-weight: 700;
      }
      .number {
        width: 100rpx;
        text-align: center;
        font-weight: 700;
      }
    }
  }
}
</style>
