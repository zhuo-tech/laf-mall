<template>
  <view class="page">
    <view>
      <uni-search-bar clearButton="always" radius="100" placeholder="请输入关键词" />
    </view>
    <view class="hot-seek">
      <view class="seekbox">
        <view class="seek">热门搜索</view>
        <view class="term">
          <view v-for="item in 6" class="term-item">护理</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
</script>

<style lang="scss" scoped>
.page {
  .hot-seek {
    margin: 30rpx;
    .seekbox {
      border-bottom: 1rpx solid #faf7f7;
      .seek {
        color: #b4b5b4;
      }
      .term {
        margin-top: 30rpx;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .term-item {
          width: 120rpx;
          height: 60rpx;
          border: 1rpx solid #d8d8d8;
          color: #454545;
          text-align: center;
          line-height: 60rpx;
          margin-bottom: 20rpx;
        }
      }
    }
  }
}
</style>
