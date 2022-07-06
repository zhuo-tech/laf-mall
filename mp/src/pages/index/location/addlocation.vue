<template>
    <view>
        <view class="item-box">
            <view class="name"> 收货人</view>
            <view class="name-value"
            >
                <input placeholder="请输入姓名" required type="text"
                />
            </view>
        </view>
        <view class="item-box">
            <view class="name"> 手机号码</view>
            <view class="name-value"
            >
                <input maxlength="11" placeholder="输入手机号码" required type="number"
                />
            </view>
        </view>
        <view class="item-box">
            <view class="name"> 选择地区</view>
            <view class="name-value">请选择</view>
            <view class="icon"
            >
                <uni-icons color="#ee5382" size="30" type="location"></uni-icons
                >
            </view>
        </view>
        <view class="item-box">
            <view class="name"> 详细地址</view>
            <view class="name-value"
            >
                <input placeholder="小区楼栋、乡村名称" required type="text"
                />
            </view>
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

<script lang="ts" setup>

function open(this: any) {
    this.$refs.popup.open('top')
}
</script>

<style lang="scss" scoped>
.item-box {
    display: flex;
    height: 90 rpx;
    border-bottom: 1 rpx solid #eeeeee;

    .name {
        width: 200 rpx;
        height: 60 rpx;
        margin: 20 rpx 0 0 20 rpx;
    }

    .name-value {
        margin: 20 rpx 0 0 20 rpx;
    }

    .icon {
        margin-left: 300 rpx;
        line-height: 80 rpx;
    }
}

.address {
    margin-left: 10 rpx;
    line-height: 80 rpx;
}

.bottom-but {
    width: 700 rpx;
    height: 80 rpx;
    text-align: center;
    background-color: #ee5382;
    line-height: 80 rpx;
    border-radius: 50 rpx;
    margin: auto;
    margin-top: 180 rpx;
    color: #fff;
}
</style>
