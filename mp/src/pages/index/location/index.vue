<template>
    <view>
        <view class="box">
            <view>
                <img alt="" class="img" src="../../../static/img/queshengtu.png" />
            </view>
            <view style="color: #bab8b9">尚未添加地址...</view>

            <view class="but-box" @click="Goaddlocation">
                <view class="but">
                    <uni-icons color="#fff" size="30" type="location"></uni-icons>
                    <view class="add">添加地址</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>

function Goaddlocation() {
    uni.navigateTo({
        url: '/pages/index/location/addlocation',
    })
}
</script>

<style lang="scss" scoped>
.box {
    position: relative;
    text-align: center;

    .img {
        width: 100%;
        height: 800 rpx;
    }

    .but-box {
        position: fixed;
        bottom: 20 rpx;
        left: 74 rpx;
        width: 600 rpx;
        height: 80 rpx;
        line-height: 80 rpx;
        background-color: #ee5382;
        border-radius: 50 rpx;

        .but {
            display: flex;
            width: 200 rpx;
            height: 80 rpx;
            margin: auto;

            .add {
                color: #fff;
            }
        }
    }
}
</style>
