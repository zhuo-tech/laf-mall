<template>
  <view class="content">
    <view @click="goGoodSearch">
      <uni-search-bar cancelButton="none" radius="100" placeholder="请输入关键词" />
    </view>
    <view>
      <view class="uni-margin-wrap">
        <swiper
          class="swiper"
          circular
          :indicator-dots="true"
          :autoplay="true"
          :interval="2000"
          :duration="500"
        >
          <swiper-item>
            <img class="slideshow" src="../../static/img/1.png" alt="" />
          </swiper-item>
          <swiper-item>
            <img class="slideshow" src="../../static/img/2.jpg" alt="" />
          </swiper-item>
          <swiper-item>
            <img class="slideshow" src="../../static/img/3.jpg" alt="" />
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="nav">
      <view @click="goAllCommodity" class="navbox">
        <img class="nav-icon" src="../../static/icon/qb.png" alt="" />
        <view class="nav-text">全部商品</view>
      </view>
      <view @click="GoGroupbooking" class="navbox">
        <img class="nav-icon" src="../../static/icon/pt.png" alt="" />
        <view class="nav-text">限时拼团</view>
      </view>
      <view @click="GoSeckill" class="navbox">
        <img class="nav-icon" src="../../static/icon/mx.png" alt="" />
        <view class="nav-text">限时秒杀</view>
      </view>
      <view class="navbox">
        <img class="nav-icon" src="../../static/icon/jf.png" alt="" />
        <view class="nav-text">积分商城</view>
      </view>
      <view class="navbox">
        <img class="nav-icon" src="../../static/icon/kj.png" alt="" />
        <view class="nav-text">砍价专区</view>
      </view>
    </view>
    <view class="limit">
      <view class="countdown">
        <view class="limit-text">限时秒杀</view>
        <view>
          <uni-countdown
            :show-day="false"
            color="#FFFFFF"
            background-color="#fb5556"
            :hour="2"
            :minute="30"
            :second="0"
          ></uni-countdown>
        </view>
      </view>
      <view class="seckill">
        <view class="seckill-commodity">
          <img class="seckill-img" src="../../static/img/1.png" alt="" />
          <view class="seckill-name">秒杀品</view>
          <view class="seckill-price">￥1280</view>
          <view class="seckill-Past-price">￥1580</view>
        </view>
        <view class="seckill-commodity">
          <img class="seckill-img" src="../../static/img/2.jpg" alt="" />
          <view class="seckill-name">秒杀品</view>
          <view class="seckill-price">￥1280</view>
          <view class="seckill-Past-price">￥1580</view>
        </view>
        <view class="seckill-commodity">
          <img class="seckill-img" src="../../static/img/3.jpg" alt="" />
          <view class="seckill-name">秒杀品</view>
          <view class="seckill-price">￥1280</view>
          <view class="seckill-Past-price">￥1580</view>
        </view>
      </view>
    </view>
    <view class="recommend">
      <view style="display: flex">
        <view
          @click="recomTab(index)"
          v-for="(item, index) in tablist"
          :key="index"
          :class="recom == index ? 'select' : 'unselected'"
          >{{ item.name }}
        </view>
      </view>
      <view class="product">
        <view
          @click="GoodsDetails"
          v-show="recom == 0"
          v-for="item in 5"
          class="product-item"
        >
          <img class="product-img" src="../../static/img/3.jpg" alt="" />
          <view class="product-text">精品地毯</view>
          <view style="display: flex">
            <view class="product-price">￥1280</view>
            <view class="product-Past-price">￥1580</view>
          </view>
        </view>
        <view
          @click="GoodsDetails"
          v-show="recom == 1"
          v-for="item in 4"
          class="product-item"
        >
          <img class="product-img" src="../../static/img/2.jpg" alt="" />
          <view class="product-text">精品地毯</view>
          <view style="display: flex">
            <view class="product-price">￥1280</view>
            <view class="product-Past-price">￥1580</view>
          </view>
        </view>
        <view
          @click="GoodsDetails"
          v-show="recom == 2"
          v-for="item in 3"
          class="product-item"
        >
          <img class="product-img" src="../../static/img/1.png" alt="" />
          <view class="product-text">精品地毯</view>
          <view style="display: flex">
            <view class="product-price">￥1280</view>
            <view class="product-Past-price">￥1580</view>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">暂无更多...</view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const recom = ref(0);
const tablist = reactive([{ name: "精品推荐" }, { name: "新品" }, { name: "优惠" }]);

function recomTab(index: number) {
  recom.value = index;
}

function goGoodSearch() {
  uni.navigateTo({
    url: "/pages/index/search/index",
  });
}

//全部商品
function goAllCommodity() {
  uni.navigateTo({
    url: "/pages/index/allCommodity/index",
  });
}

function GoodsDetails() {
  uni.navigateTo({
    url: "/pages/index/GoodsDetails/index",
  });
}

function GoSeckill() {
  uni.navigateTo({
    url: "/pages/index/seckill/index",
  });
}

function GoGroupbooking() {
  uni.navigateTo({
    url: "/pages/index/groupbooking/index",
  });
}
</script>

<style lang="less">
.content {
  .swiper {
    height: 430rpx;
    .slideshow {
      width: 100%;
    }
  }
  .nav {
    margin: 32rpx 0 40rpx 0;
    display: flex;
    justify-content: space-around;
    .navbox {
      width: 100rpx;
      height: 148rpx;
      .nav-icon {
        margin-left: 4rpx;
        width: 88rpx;
        height: 88rpx;
      }
      .nav-text {
        margin-top: 5rpx;
        font-size: 24rpx;
        color: #666666;
      }
    }
  }
  .limit {
    .countdown {
      display: flex;
    }
    .limit-text {
      margin: 0rpx 25rpx;
      width: 150rpx;
      font-size: 35rpx;
      font-weight: 700;
      line-height: 45rpx;
      color: #272727;
      opacity: 1;
    }
    .seckill {
      display: flex;
      justify-content: space-around;
      margin-top: 32rpx;
      width: 100%;
      .seckill-commodity {
        width: 200rpx;
        .seckill-img {
          width: 200rpx;
          height: 180rpx;
          border-radius: 15rpx;
        }
        .seckill-name {
          font-size: 25rpx;
          line-height: 40rpx;
          color: #645e5e;
          text-align: center;
        }
        .seckill-price {
          line-height: 50rpx;
          color: #ee5382;
          font-size: 32rpx;
          font-weight: bold;
          text-align: center;
        }
        .seckill-Past-price {
          font-size: 20rpx;
          font-weight: 400;
          line-height: 37rpx;
          color: #645e5e;
          text-align: center;
          text-decoration: line-through;
        }
      }
    }
  }
  .recommend {
    width: 100%;
    margin: 30rpx 0 0 20rpx;
    .select {
      width: 140rpx;
      height: 45rpx;
      font-size: 30rpx;
      color: #272727;
      font-weight: bold;
      text-align: center;
      border-bottom: 3rpx solid #ee5382;
    }
    .unselected {
      width: 140rpx;
      font-size: 30rpx;
      color: #272727;
      text-align: center;
    }
    .product {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 20rpx 40rpx 0 0;
      .product-item {
        margin-top: 10rpx;
        width: 340rpx;
        height: 400rpx;
        .product-img {
          width: 340rpx;
          height: 300rpx;
          border-radius: 15rpx;
        }
        .product-text {
          font-size: 26rpx;
          color: #645e5e;
          width: 159rpx;
          height: 35rpx;
        }
        .product-price {
          color: #ee5382;
          font-size: 32rpx;
          font-weight: bold;
          text-align: center;
        }
        .product-Past-price {
          margin-left: 50rpx;
          font-size: 20rpx;
          font-weight: 400;
          line-height: 50rpx;
          color: #645e5e;
          text-align: center;
          text-decoration: line-through;
        }
      }
    }
  }
  .bottom {
    margin: 50rpx 0 10rpx 0;
    width: 100%;
    height: 50rpx;
    text-align: center;
    color: #645e5e;
    font-size: 26rpx;
  }
}
</style>
