<template>
  <view class="box">
    <view class="nickname">
      <view class="nickname-box">
        <image
          style="
            width: 120rpx;
            height: 120rpx;
            border-radius: 100rpx;
            background-color: #eeeeee;
          "
          src="../../../static/img/3.jpg"
          mode="aspectFill"
          alt=""
        />
        <view class="nick-box">
          <img class="nick-img" src="../../../static/icon/alter.png" alt="" />
        </view>
        <view class="nikename-phone">
          <view class="nick">{{ nickname }}</view>
          <view class="phone">绑定手机号:{{ phone }}</view>
        </view>
      </view>
    </view>
    <view class="mid">
      <view class="mid-nick">
        <view class="nick">昵称</view>
        <view>
          <input
            v-model="changenikename"
            class="now-nick"
            type="text"
            maxlength="9"
            :placeholder="nickname"
          />
        </view>
      </view>
    </view>
    <view class="mid-p">
      <view class="mid-nick-p">
        <view class="nick-p">密码</view>
        <view>
          <input
            @click="ChangeHint()"
            v-model="cipher"
            class="now-nick-p"
            type="password"
            maxlength="12"
            placeholder="******"
          />
        </view>
      </view>
    </view>

    <view @click="changepassword" class="save">保存修改</view>
    <view @click="exit()" class="logout">退出登录</view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue";
import { cloud } from "../../../api/cloud";
import { showSuccess, showTip } from "../../../utils/show";

const cipher = ref("");
//更改昵称
const changenikename = ref("");

//获取localStorage缓存
const e = localStorage.getItem("user");

//转对象
const obj = JSON.parse(e!);

//昵称
const nickname = obj.nickname;

//手机号
const phone = obj.username;

//退出登录
function exit() {
  localStorage.clear();
  showSuccess("退出成功");
  Gomine();
}

function ChangeHint() {
  return showTip("密码长度在6~12位");
}

async function changepassword() {
  const r = await cloud.invokeFunction("app-change-password", {
    username: obj._id,
    cipher: cipher.value,
    nickname: changenikename.value,
  });
  if (r.code == 0) {
    showSuccess("修改成功");
  }
}

//跳转登录页面
function Gomine() {
  uni.reLaunch({
    url: `/pages/index/mine`,
  });
}
</script>

<style lang="scss" scoped>
.box {
  background-color: #f5f5f5;
  height: 100vh;
  .nickname {
    position: relative;
    width: 100%;
    height: 180rpx;
    background-color: #fff;
    .nickname-box {
      display: flex;
      padding: 40rpx 30rpx 20rpx 40rpx;
      .nick-box {
        position: absolute;
        bottom: 10rpx;
        left: 115rpx;
        .nick-img {
          width: 40rpx;
          height: 40rpx;
        }
      }
      .nikename-phone {
        margin: 30rpx;
        .nick {
          width: 350rpx;
          height: 40rpx;
          font-size: 32rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .phone {
          width: 500rpx;
          height: 60rpx;
          font-size: 28rpx;
          line-height: 60rpx;
          color: #999999;
        }
      }
    }
  }
  .mid {
    width: 100%;
    height: 100rpx;
    margin-top: 15rpx;
    background-color: #fff;
    border-bottom: 1rpx solid #f2f2f2;
    .mid-nick {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 100rpx;
      border-bottom: #f2f2f2;
      .nick {
        margin-left: 40rpx;
        font-size: 32rpx;
        line-height: 100rpx;
      }
      .now-nick {
        margin-top: 30rpx;
        margin-left: 40rpx;
        font-size: 28rpx;
        color: #868686;
      }
    }
  }
  .mid-p {
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    .mid-nick-p {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 100rpx;
      border-bottom: #f2f2f2;
      .nick-p {
        margin-left: 40rpx;
        font-size: 32rpx;
        line-height: 100rpx;
      }
      .now-nick-p {
        margin-top: 30rpx;
        margin-left: 40rpx;
        font-size: 28rpx;
        color: #868686;
      }
    }
  }
  .save {
    margin: 0 auto;
    margin-top: 80rpx;
    width: 710rpx;
    height: 90rpx;
    background-color: #ee5382;
    border-radius: 50rpx;
    text-align: center;
    line-height: 90rpx;
    color: #fff;
  }
  .logout {
    margin: 0 auto;
    margin-top: 50rpx;
    width: 710rpx;
    height: 90rpx;
    border-radius: 50rpx;
    border: 1rpx solid #ee5382;
    text-align: center;
    line-height: 90rpx;
    color: #ee5382;
  }
}
</style>
