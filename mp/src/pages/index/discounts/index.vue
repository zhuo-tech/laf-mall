<template>
    <view>
        <view v-for="item in 5" class="box">
            <view>
                <img alt="" class="img" src="../../../static/icon/yhq.png" />
            </view>
            <view class="title"> 订单满100可用</view>
            <view class="time">2021.01.08-2022.08.08</view>
            <view class="price">￥10</view>
            <view class="type">通用券</view>
            <view class="but">立即领取</view>
        </view>
    </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.box {
    position: relative;
    width: 710 rpx;
    height: 166 rpx;
    margin: 20 rpx;

    .img {
        width: 710 rpx;
        height: 157 rpx;
    }

    .title {
        font-size: 28 rpx;
        position: absolute;
        top: 20 rpx;
        left: 20 rpx;
        color: #fff;
    }

    .time {
        position: absolute;
        bottom: 34 rpx;
        left: 10 rpx;
        font-size: 24 rpx;
        color: #ee5382;
    }

    .price {
        position: absolute;
        color: #fff;
        top: 30 rpx;
        right: 100 rpx;
        font-size: 40 rpx;
    }

    .type {
        position: absolute;
        top: 26 rpx;
        right: 0 rpx;
        font-size: 26 rpx;
        color: #fff;
        transform: rotate(45deg);
    }

    .but {
        position: absolute;
        bottom: 24 rpx;
        right: 30 rpx;
        width: 150 rpx;
        height: 46 rpx;
        font-size: 26 rpx;
        line-height: 46 rpx;
        border-radius: 50 rpx;
        text-align: center;
        color: #fff;
        border: 1 rpx solid #fff;
    }
}
</style>
