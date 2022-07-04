<template>
  <view>
    <view class="title">
      <view class="title-bgc">
        <img class="bgc-img" src="../../../static/img/ms.png" alt="" />
        <view class="title-box">
          <img class="title-img" src="../../../static/img/miaosha.png" alt="" />
        </view>
      </view>
    </view>

    <view class="goods">
      <view class="time">
        <view @click="each(0)" :class="index == 0 ? 'select' : 'saleable'"
          >18:00开抢中</view
        >
        <view @click="each(1)" :class="index == 1 ? 'select' : 'saleable'"
          >19:00即将开抢</view
        >
        <view @click="each(2)" :class="index == 2 ? 'select' : 'saleable'"
          >20:00即将开抢</view
        >
      </view>

      <view class="people">
        <view class="how-people">4936人疯抢中</view>
        <view class="people-img-box">
          <img class="people-img" src="../../../static/img/3.jpg" alt="" />
        </view>
        <view style="margin-left: -15rpx" class="people-img-box">
          <img class="people-img" src="../../../static/img/3.jpg" alt="" />
        </view>
        <view style="margin-left: -15rpx" class="people-img-box">
          <img class="people-img" src="../../../static/img/3.jpg" alt="" />
        </view>

        <view class="deadline"
          >距结束
          <view>
            <uni-countdown
              class="countdown"
              :show-day="false"
              color="#FFFFFF"
              background-color="#fb5556"
              :hour="2"
              :minute="30"
              :second="0"
            ></uni-countdown>
          </view>
        </view>
      </view>

      <view v-show="index == 0" v-for="item in 6" class="seckill-goods">
        <view class="seckill-img">
          <img class="seckill-img" src="../.../../../../static/img/3.jpg" alt="" />
        </view>
        <view class="right">
          <view class="tag">
            <view class="label">限时低价</view>
            <view class="labeltwo">降价补差</view>
          </view>
          <view class="name"> 我是如此相信 </view>
          <view class="progress-box">
            <progress
              :percent="pgList[0]"
              show-info
              activeColor="#ed5481"
              stroke-width="5"
              border-radius="10"
            />
          </view>
          <view class="sale">已售500件</view>
          <view class="reduceprice">直降66元</view>
          <view class="second">
            <view class="second-name">秒杀价</view>
            <view class="second-price">￥1580</view>
          </view>
        </view>
      </view>

      <view v-show="index == 1" v-for="item in 1" class="seckill-goods">
        <view class="seckill-img">
          <img class="seckill-img" src="../.../../../../static/img/3.jpg" alt="" />
        </view>
        <view class="right">
          <view class="tag">
            <view class="label">限时低价</view>
            <view class="labeltwo">降价补差</view>
          </view>
          <view class="name"> 我是如此相信 </view>
          <view class="progress-box">
            <progress
              :percent="pgList[0]"
              show-info
              activeColor="#ed5481"
              stroke-width="5"
              border-radius="10"
            />
          </view>
          <view class="sale">已售500件</view>
          <view class="reduceprice">直降66元</view>
          <view class="second">
            <view class="second-name">秒杀价</view>
            <view class="second-price">￥1580</view>
          </view>
        </view>
      </view>

      <view v-show="index == 2" v-for="item in 2" class="seckill-goods">
        <view class="seckill-img">
          <img class="seckill-img" src="../.../../../../static/img/3.jpg" alt="" />
        </view>
        <view class="right">
          <view class="tag">
            <view class="label">限时低价</view>
            <view class="labeltwo">降价补差</view>
          </view>
          <view class="name"> 我是如此相信 </view>
          <view class="progress-box">
            <progress
              :percent="pgList[0]"
              show-info
              activeColor="#ed5481"
              stroke-width="5"
              border-radius="10"
            />
          </view>
          <view class="sale">已售500件</view>
          <view class="reduceprice">直降66元</view>
          <view class="second">
            <view class="second-name">秒杀价</view>
            <view class="second-price">￥1580</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue";

const index = ref(0);

const pgList = reactive([20]);

function each(e: number) {
  index.value = e;
}
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  .title-bgc {
    margin-top: -90rpx;
    width: 100%;
    height: 600rpx;
    .bgc-img {
      width: 100%;
      height: 600rpx;
    }
  }
  .title-box {
    position: absolute;
    top: 50rpx;
    left: 100rpx;
    width: 500rpx;
    height: 500rpx;
    .title-img {
      width: 500rpx;
      height: 500rpx;
    }
  }
}
.goods {
  border-radius: 50rpx 50rpx 0 0;
  position: absolute;
  top: 550rpx;
  width: 100%;
  background-color: #fff;
  .time {
    margin-top: 50rpx;
    display: flex;
    justify-content: space-around;
  }
  .saleable {
    font-size: 32rpx;
    margin-bottom: 30rpx;
  }
  .select {
    font-size: 32rpx;
    color: #ef5383;
    border-bottom: 4rpx solid #ef5383;
    margin-bottom: 30rpx;
  }
  .people {
    display: flex;
    width: 100%;
    height: 70rpx;
    background-color: #fbd2df;
    .how-people {
      margin-left: 30rpx;
      margin-right: 20rpx;
      font-size: 30rpx;
      line-height: 70rpx;
      color: #ef5383;
    }
    .people-img-box {
      width: 50rpx;
      height: 50rpx;
      padding: 10rpx 0rpx;
      .people-img {
        width: 50rpx;
        height: 50rpx;
        border-radius: 50rpx;
      }
    }
    .deadline {
      display: flex;
      margin-left: 70rpx;
      font-size: 32rpx;
      line-height: 70rpx;
      color: #ef5383;
      .countdown {
        margin-left: 15rpx;

        width: 180rpx;
        height: 75rpx;
      }
    }
  }
  .seckill-goods {
    position: relative;
    display: flex;
    padding: 20rpx 20rpx 10rpx 20rpx;
    border-bottom: 1rpx solid #e0dee1;
    .seckill-img {
      border-radius: 10rpx;
      width: 250rpx;
      height: 230rpx;
    }
    .right {
      padding-left: 20rpx;
      .tag {
        display: flex;
        .label {
          text-align: center;
          width: 105rpx;
          height: 30rpx;
          line-height: 30rpx;
          font-size: 20rpx;
          color: #fff;
          background-color: #ee5382;
          border-radius: 5rpx;
          margin-right: 20rpx;
        }
        .labeltwo {
          text-align: center;
          width: 105rpx;
          height: 30rpx;
          line-height: 30rpx;
          font-size: 20rpx;
          color: #fff;
          background-color: #686363;
          border-radius: 5rpx;
        }
      }
      .name {
        margin-top: 5rpx;
        width: 100%;
        height: 50rpx;
        font-size: 32rpx;
        line-height: 50rpx;
      }
      .progress-box {
        margin-top: 5rpx;
      }
      .sale {
        top: 110rpx;
        right: 30rpx;
        position: absolute;
        font-size: 24rpx;
        color: #b8b8b8;
      }
      .reduceprice {
        padding: 4rpx 0rpx;
        width: 120rpx;
        height: 30rpx;
        font-size: 24rpx;
        text-align: center;
        border: 1rpx solid #ee5382;
        color: #ee5382;
      }
      .second {
        display: flex;
        .second-name {
          margin-top: 10rpx;
          color: #ee5382;
          font-size: 28rpx;
        }
        .second-price {
          margin-top: 4rpx;
          margin-left: 20rpx;
          font-size: 32rpx;
          color: #ee5382;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
