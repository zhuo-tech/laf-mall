<template>
  <view>
    <view class="item-box">
      <view class="name"> 收货人 </view>
      <view class="name-value"
        ><input type="text" placeholder="请输入姓名" required
      /></view>
    </view>
    <view class="item-box">
      <view class="name"> 手机号码 </view>
      <view class="name-value"
        ><input type="number" maxlength="11" placeholder="输入手机号码" required
      /></view>
    </view>
    <view class="item-box">
      <view class="name"> 选择地区 </view>
      <view class="name-value">请选择</view>
      <view class="icon"
        ><uni-icons color="#ee5382" type="location" size="30"></uni-icons
      ></view>
    </view>
    <view class="item-box">
      <view class="name"> 详细地址 </view>
      <view class="name-value"
        ><input type="text" placeholder="小区楼栋、乡村名称" required
      /></view>
    </view>
    <checkbox-group class="address">
      <label>
        <checkbox style="transform: scale(0.7)" value="cb" />
      </label>
      设置为默认地址
    </checkbox-group>

    <view class="bottom-but">保存</view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";

function open(this: any) {
  this.$refs.popup.open("top");
}
</script>

<style lang="scss" scoped>
.item-box {
  display: flex;
  height: 90rpx;
  border-bottom: 1rpx solid #eeeeee;
  .name {
    width: 200rpx;
    height: 60rpx;
    margin: 20rpx 0 0 20rpx;
  }
  .name-value {
    margin: 20rpx 0 0 20rpx;
  }
  .icon {
    margin-left: 300rpx;
    line-height: 80rpx;
  }
}
.address {
  margin-left: 10rpx;
  line-height: 80rpx;
}
.bottom-but {
  width: 700rpx;
  height: 80rpx;
  text-align: center;
  background-color: #ee5382;
  line-height: 80rpx;
  border-radius: 50rpx;
  margin: auto;
  margin-top: 180rpx;
  color: #fff;
}
</style>
