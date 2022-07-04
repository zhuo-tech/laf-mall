<template>
  <view class="box">
    <view class="title">
      <view style="display: flex">
        <uni-search-bar
          style="width: 90%"
          clearButton="always"
          cancelButton="none"
          radius="100"
          placeholder="搜索商品信息"
        />
        <view class="layout-box">
          <view class="layout-cut" @click="layout">
            <img
              v-show="cut == false"
              class="layout"
              src="../../../static/icon/heng.png"
              alt=""
            />
            <img
              v-show="cut == true"
              class="layout"
              src="../../../static/icon/shu.png"
              alt=""
            />
          </view>
        </view>
      </view>
      <view class="sorting">
        <view class="sortingbox">
          <view class="sort">默认</view>
          <view @click="set_where(0)" class="sort"
            >价格
            <img
              v-show="price === 0"
              class="sort-ico"
              src="../../../static/icon/horn.png"
              alt=""
            />
            <img
              v-show="price === 1"
              class="sort-ico"
              src="../../../static/icon/up.png"
              alt=""
            />
            <img
              v-show="price === 2"
              class="sort-ico"
              src="../../../static/icon/down.png"
              alt=""
            />
          </view>
          <view @click="set_where(1)" class="sort"
            >销量
            <img
              v-show="stock === 0"
              class="sort-ico"
              src="../../../static/icon/horn.png"
              alt=""
            />
            <img
              v-show="stock === 1"
              class="sort-ico"
              src="../../../static/icon/up.png"
              alt=""
            />
            <img
              v-show="stock === 2"
              class="sort-ico"
              src="../../../static/icon/down.png"
              alt=""
            />
          </view>
          <view class="sort">新品</view>
        </view>
      </view>
    </view>
    <view class="filler"></view>
    <view class="area">
      <view v-show="cut == true" class="centre">
        <view v-for="(item, index) in 2" class="centres">
          <img class="centre-img" src="../../../static/img/1.png" alt="" />
          <view class="centre-box">
            <view class="centre-name">这是一个名字</view>
            <view class="centre-price-box">
              <view class="centre-price">￥1580</view>
              <view class="work">已售100件</view>
            </view>
          </view>
        </view>
      </view>
      <view v-show="cut == false" class="sort-centre">
        <view v-for="(item, index) in 4" class="sort-height">
          <img class="sort-centre-img" src="../../../static/img/2.jpg" alt="" />
          <view class="sort-centre-name">这是一个</view>
          <view class="sort-centre-price">
            <view class="sort-price"> ￥1580 </view>
            <view class="sort-work"> 已售100件 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue";
const cut = ref(true);
const price = ref(0);
const stock = ref(0);

function layout() {
  cut.value = !cut.value;
}

function set_where(index: number) {
  switch (index) {
    case 0:
      if (price.value === 0) price.value = 1;
      else if (price.value === 1) price.value = 2;
      else if (price.value === 2) price.value = 0;
      stock.value = 0;
      break;
    case 1:
      if (stock.value === 0) stock.value = 1;
      else if (stock.value === 1) stock.value = 2;
      else if (stock.value === 2) stock.value = 0;
      price.value = 0;
      break;
  }
}
</script>

<style lang="scss" scoped>
.box {
  background-color: #efeef1;
  height: 100vh;
  .title {
    width: 100%;
    height: 180rpx;
    position: fixed;
    top: 80rpx;
    background-color: #ffffff;
    .layout-box {
      margin-top: 35rpx;
      margin-right: 10rpx;
      .layout-cut {
        width: 40rpx;
        height: 40rpx;
      }
      .layout {
        width: 38rpx;
        height: 38rpx;
      }
    }
    .sorting {
      padding: 0 40rpx;
      .sortingbox {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .sort {
          text-align: center;
          color: #454545;
          .sort-ico {
            width: 18rpx;
            height: 26rpx;
          }
        }
      }
    }
  }
  .filler {
    height: 170rpx;
  }
  .area {
    .centre {
      padding-top: 20rpx;
      .centres {
        width: 100%;
        border-bottom: 1rpx solid #f6f6f6;
        display: flex;
        background-color: #fff;
        .centre-img {
          width: 200rpx;
          height: 200rpx;
          border-radius: 15rpx;
          margin: 20rpx 0 20rpx 20rpx;
        }
        .centre-box {
          margin-top: 40rpx;
          margin-left: 30rpx;
          .centre-name {
            font-size: 35rpx;
          }
          .centre-price-box {
            display: flex;
            margin-top: 60rpx;
            .centre-price {
              color: #ee5382;
              font-size: 38rpx;
              font-weight: 700;
            }
            .work {
              margin-left: 200rpx;
              margin-top: 12rpx;
              font-size: 25rpx;
              color: #b5b5bd;
              font-weight: 700;
            }
          }
        }
      }
    }
    .sort-centre {
      padding: 0rpx 20rpx;
      padding-top: 20rpx;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .sort-height {
        width: 345rpx;
        height: 400rpx;
        border-radius: 15rpx;
        background-color: #fff;
        margin-bottom: 20rpx;
        .sort-centre-img {
          width: 345rpx;
          height: 280rpx;
          border-top-left-radius: 15rpx;
          border-top-right-radius: 15rpx;
        }
        .sort-centre-name {
          font-size: 32rpx;
          margin: 0 0 10rpx 20rpx;
        }
        .sort-centre-price {
          display: flex;
          margin-left: 20rpx;

          .sort-price {
            font-size: 35rpx;
            font-weight: 700;
            color: #ee5382;
          }
          .sort-work {
            margin-left: 50rpx;
            margin-top: 8rpx;
            font-size: 26rpx;
            color: #b5b5bd;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
