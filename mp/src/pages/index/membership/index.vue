<template>
    <view>
        <view class="img-box">
            <view v-show="select == 0">
                <img alt="" class="img" src="../../../static/img/3.jpg" />
            </view>
            <view v-show="select == 1">
                <img alt="" class="img" src="../../../static/img/2.jpg" />
            </view>
            <view v-show="select == 2">
                <img alt="" class="img" src="../../../static/img/1.png" />
            </view>
        </view>

        <view class="mid">
            <view class="middle">
                <view class="title">请选择会员套餐</view>
                <view class="setmeal-box">
                    <view :class="select == 0 ? 'select' : 'setmeal'" @click="changgesetmeal(0)">
                        <view class="setmeal-name"> 黄金会员</view>
                        <view class="setmeal-price">￥99</view>
                        <view class="underline"></view>
                        <view class="discount">商品享受9.5折优惠</view>
                    </view>
                    <view :class="select == 1 ? 'select' : 'setmeal'" @click="changgesetmeal(1)">
                        <view class="setmeal-name"> 铂金会员</view>
                        <view class="setmeal-price">￥199</view>
                        <view class="underline"></view>
                        <view class="discount">商品享受9折优惠</view>
                    </view>
                    <view :class="select == 2 ? 'select' : 'setmeal'" @click="changgesetmeal(2)">
                        <view class="setmeal-name"> 钻石会员</view>
                        <view class="setmeal-price">￥299</view>
                        <view class="underline"></view>
                        <view class="discount">商品享受8折优惠</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="pay-box">
            <view style="display: flex">
                <img alt="" class="wx" src="../../../static/icon/wx.png" />
                <view class="wxpay">微信支付</view>
            </view>
            <view>
                <img alt="" class="gou" src="../../../static/icon/gou.png" />
            </view>
        </view>

        <view class="bottom-but">立即开通</view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const select = ref(0)

function changgesetmeal(e: number) {
    select.value = e
}
</script>

<style lang="scss" scoped>
.img-box {
    height: 470 rpx;
    display: flex;
    justify-content: space-around;

    .img {
        margin-top: 30 rpx;
        width: 700 rpx;
        height: 400 rpx;
        border-radius: 25 rpx;
    }
}

.mid {
    height: 430 rpx;
    background-color: #f5f5f5;
    padding: 25 rpx;

    .middle {
        width: 700 rpx;
        height: 430 rpx;
        background-color: #fff;
        border-radius: 30 rpx;

        .title {
            width: 300 rpx;
            height: 50 rpx;
            margin-left: 30 rpx;
            padding-top: 20 rpx;
            font-size: 30 rpx;
            font-weight: 700;
            margin-bottom: 20 rpx;
        }

        .setmeal-box {
            display: flex;
            justify-content: space-around;

            .setmeal {
                width: 210 rpx;
                height: 300 rpx;
                background-color: #f5f5f5;
                border-radius: 30 rpx;
                text-align: center;
                border: 1 rpx solid #f5f5f5;

                .setmeal-name {
                    margin: 30 rpx 0 50 rpx 0;
                    font-size: 30 rpx;
                }

                .setmeal-price {
                    font-size: 30 rpx;
                }

                .underline {
                    width: 100 rpx;
                    height: 20 rpx;
                    background-color: #e1dfdf;
                    margin: auto;
                    border-radius: 10 rpx;
                    margin-top: 20 rpx;
                }

                .discount {
                    color: #7e7b7b;
                    margin-top: 20 rpx;
                    font-size: 20 rpx;
                }
            }

            .select {
                width: 210 rpx;
                height: 300 rpx;
                background-color: #ffe5ed;
                border-radius: 30 rpx;
                text-align: center;
                border: 1 rpx solid #f16e96;

                .setmeal-name {
                    margin: 30 rpx 0 50 rpx 0;
                    font-size: 30 rpx;
                }

                .setmeal-price {
                    font-size: 30 rpx;
                }

                .underline {
                    width: 100 rpx;
                    height: 20 rpx;
                    background-color: #fff;
                    margin: auto;
                    border-radius: 10 rpx;
                    margin-top: 20 rpx;
                }

                .discount {
                    color: #7e7b7b;
                    margin-top: 20 rpx;
                    font-size: 20 rpx;
                }
            }
        }
    }
}

.pay-box {
    padding: 30 rpx;
    display: flex;
    justify-content: space-between;

    .wx {
        width: 48 rpx;
        height: 40 rpx;
    }

    .wxpay {
        font-size: 30 rpx;
        margin-left: 20 rpx;
    }

    .gou {
        width: 40 rpx;
        height: 40 rpx;
    }
}

.bottom-but {
    margin: auto;
    width: 660 rpx;
    height: 80 rpx;
    margin-top: 50 rpx;
    background-color: #ee5382;
    text-align: center;
    line-height: 80 rpx;
    color: #fff;
    border-radius: 50 rpx;
}
</style>
