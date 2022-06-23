<template>
  <view class="box">
    <view v-show="false" class="login">
      <view class="hint"> 为了提供更好的服务，请先登录 </view>
      <view @click="GoLogin" class="login-hint"> 去登录 </view>
    </view>

    <view class="bgc">
      <img class="bgc-img" src="../../static/icon/paopao.png" alt="" />
      <view @click="GoSet" class="set"
        ><img class="set-img" src="../../static/icon/shezhi.png" alt="" />
      </view>
      <view class="datum">
        <view class="sort">
          <view class="head-portrait">
            <image
              style="
                width: 150rpx;
                height: 150rpx;
                border-radius: 100rpx;
                background-color: #eeeeee;
              "
              mode="aspectFill"
              :src="tupian"
            ></image
          ></view>
          <view class="name">有时候有时候</view>
        </view>
        <view class="wire"></view>
        <view class="usable">
          <view class="balance">
            <view class="balance-name">我的余额</view>
            <view class="balance-number">0</view>
          </view>
          <view class="balance">
            <view class="balance-name">当前积分</view>
            <view class="balance-number">0</view>
          </view>
          <view class="balance">
            <view class="balance-name">优惠券</view>
            <view class="balance-number">0</view>
          </view>
        </view>
      </view>
    </view>

    <view class="orderInfo">
      <view class="order-box">
        <view class="my-roder">我的订单</view>
        <view @click="GoAllrders" class="all-roder">全部订单></view>
      </view>
      <view class="goodsprogress">
        <view class="goods-box">
          <view>
            <img class="goods-ico" src="../../static/icon/daifukuan.png" alt="" />
          </view>
          <view class="goods-name">待付款</view>
        </view>
        <view class="goods-box">
          <view>
            <img class="goods-ico" src="../../static/icon/daifahuo.png" alt="" />
          </view>
          <view class="goods-name">待发货</view>
        </view>
        <view class="goods-box">
          <view>
            <img class="goods-ico" src="../../static/icon/daishouhuo.png" alt="" />
          </view>
          <view class="goods-name">待收货</view>
        </view>
        <view class="goods-box">
          <view>
            <img class="goods-ico" src="../../static/icon/daipingjia.png" alt="" />
          </view>
          <view class="goods-name">待评价</view>
        </view>
        <view class="goods-box">
          <view>
            <img
              style="margin-left: 25rpx"
              class="goods-ico"
              src="../../static/icon/shouhou.png"
              alt=""
            />
          </view>
          <view class="goods-name">售后/退款</view>
        </view>
      </view>
    </view>
    <view class="cut-offrule"></view>
    <view class="tab">
      <view>
        <img class="tab-ico" src="../../static/icon/zuji.png" alt="" />
      </view>
      <view class="tab-name">我的足迹</view>
    </view>
    <view class="tab">
      <view>
        <img class="tab-ico" src="../../static/icon/huiyuan.png" alt="" />
      </view>
      <view class="tab-name">会员中心</view>
    </view>
    <view class="tab">
      <view>
        <img class="tab-ico" src="../../static/icon/youhuiquan.png" alt="" />
      </view>
      <view class="tab-name">优惠券</view>
    </view>
    <view class="tab">
      <view>
        <img class="tab-ico" src="../../static/icon/shoucang.png" alt="" />
      </view>
      <view class="tab-name">我的收藏</view>
    </view>
    <view class="tab">
      <view>
        <img class="tab-ico" src="../../static/icon/dizhi.png" alt="" />
      </view>
      <view class="tab-name">地址管理</view>
    </view>
    <view class="tab">
      <view>
        <img class="tab-ico" src="../../static/icon/wdjifen.png" alt="" />
      </view>
      <view class="tab-name">我的积分</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import tupian from "../../static/img/3.jpg";
function GoLogin() {
  uni.navigateTo({
    url: "/pages/index/login/index",
  });
}

function GoAllrders() {
  uni.navigateTo({
    url: "/pages/index/allrders/index",
  });
}

function GoSet() {
  uni.navigateTo({
    url: "/pages/index/set/index",
  });
}
</script>

<style lang="scss" scoped>
.box {
  .login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 650rpx;
    height: 200rpx;
    border-radius: 50rpx;
    .hint {
      margin: auto;
      width: 450rpx;
      height: 50rpx;
      text-align: center;
      margin-bottom: 60rpx;
    }
    .login-hint {
      width: 650rpx;
      height: 80rpx;
      border-radius: 50rpx;
      background-color: #ee5481;
      text-align: center;
      line-height: 80rpx;
      color: #fff;
    }
  }
  .bgc {
    position: relative;
    width: 100%;
    .bgc-img {
      width: 100%;
      height: 350rpx;
    }
    .set {
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      .set-img {
        width: 55rpx;
        height: 55rpx;
      }
    }
    .datum {
      position: absolute;
      margin: 0 25rpx;
      top: 100rpx;
      width: 700rpx;
      height: 360rpx;
      background-color: #fff;
      border-radius: 30rpx;
      box-shadow: 0rpx 5rpx 6rpx 0rpx #dfdfdf;

      .sort {
        display: flex;
        .head-portrait {
          width: 150rpx;
          height: 150rpx;
          margin: 30rpx 0 0 30rpx;
        }
        .name {
          margin: 70rpx 0 0 30rpx;
          width: 300rpx;
          height: 80rpx;
          font-size: 35rpx;
          line-height: 80rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .wire {
        margin-top: 38rpx;
        width: 100%;
        border-bottom: 1rpx solid #e2e2e4;
      }
      .usable {
        display: flex;
        justify-content: space-around;
        .balance {
          margin-top: 30rpx;
          .balance-name {
            width: 150rpx;
            height: 40rpx;
            font-size: 32rpx;
            color: #aaaabd;
            text-align: center;
          }
          .balance-number {
            width: 150rpx;
            text-align: center;
            font-size: 32rpx;
          }
        }
      }
    }
  }
  .orderInfo {
    padding: 35rpx;
    margin-top: 120rpx;
    height: 230rpx;
    .order-box {
      display: flex;
      justify-content: space-between;
      .my-roder {
        font-size: 32rpx;
        color: #000;
      }
      .all-roder {
        font-size: 32rpx;
        color: #aaaabd;
      }
    }
  }
  .goodsprogress {
    margin-top: 60rpx;
    display: flex;
    justify-content: space-between;
    .goods-box {
      .goods-ico {
        margin-left: 15rpx;
        width: 55rpx;
        height: 55rpx;
      }
      .goods-name {
        margin-top: 10rpx;
        font-size: 26rpx;
        text-align: center;
      }
    }
  }
  .cut-offrule {
    height: 20rpx;
    background-color: #efefef;
  }

  .tab {
    display: flex;
    width: 100%;
    height: 95rpx;
    border-bottom: 1rpx solid #eaeaea;
    .tab-ico {
      width: 44rpx;
      height: 44rpx;
      margin: 20rpx 30rpx 20rpx 20rpx;
    }
    .tab-name {
      line-height: 90rpx;
      font-size: 30rpx;
    }
  }
}
</style>
