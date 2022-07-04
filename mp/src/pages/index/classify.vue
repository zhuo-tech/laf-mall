<template>
  <view>
    <view>
      <uni-search-bar class="uni-mt-10" radius="100" placeholder="搜索商品" />
    </view>
    <view class="tab">
      <view>
        <view
          @click="recomTab(index)"
          v-for="(item, index) in tablist"
          :key="index"
          :class="recom == index ? 'select' : 'unselected'"
          >{{ item.name }}
        </view>
      </view>
      <view>
        <img class="tab-img" src="../../static/img/1.png" alt="" />
        <view style="display: flex">
          <view
            style="
              width: 80rpx;
              height: 40rpx;
              border-bottom: 1rpx solid #707070;
              margin-left: 110rpx;
            "
          ></view>
          <view class="tab-text">{{ name }}</view>
          <view
            style="width: 80rpx; height: 40rpx; border-bottom: 1rpx solid #707070"
          ></view>
        </view>
      </view>
    </view>
    <view v-show="recom == 0" class="sort">
      <view v-for="(item, indx) in 6" class="sort-box">
        <img class="sort-img" src="../../static/img/1.png" alt="" />
        <view class="sort-text">足球足球</view>
      </view>
    </view>
    <view v-show="recom == 1" class="sort">
      <view v-for="(item, indx) in 6" class="sort-box">
        <img class="sort-img" src="../../static/img/2.jpg" alt="" />
        <view class="sort-text">足球足球</view>
      </view>
    </view>
    <view v-show="recom == 2" class="sort">
      <view v-for="(item, indx) in 6" class="sort-box">
        <img class="sort-img" src="../../static/img/3.jpg" alt="" />
        <view class="sort-text">足球足球</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue";
const tablist = reactive([{ name: "足球" }, { name: "篮球" }, { name: "羽毛球" }]);
const recom = ref(0);
const name = ref("足球");

function recomTab(index: number) {
  recom.value = index;
  if (recom.value == 0) name.value = "足球";
  if (recom.value == 1) name.value = "篮球";
  if (recom.value == 2) name.value = "羽毛球";
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  margin-top: 30rpx;
  .select {
    width: 150rpx;
    height: 30rpx;
    color: #ee5382;
    border-left: 10rpx solid #ee5382;
    margin-bottom: 80rpx;
    text-align: center;
    line-height: 30rpx;
  }
  .unselected {
    text-align: center;
    margin-bottom: 80rpx;
    width: 150rpx;
    height: 30rpx;
    margin-left: 10rpx;
    line-height: 30rpx;
  }
  .tab-img {
    width: 560rpx;
    height: 200rpx;
  }
  .tab-text {
    text-align: center;
    width: 150rpx;
    height: 40rpx;
    line-height: 75rpx;
  }
}
.sort {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 220rpx;
  .sort-box {
    margin-right: 137rpx;
    width: 128rpx;
    height: 188rpx;
  }
  .sort-img {
    border-radius: 15rpx;
    width: 128rpx;
    height: 128rpx;
  }
  .sort-text {
    width: 128rpx;
    height: 30rpx;
    font-size: 22rpx;
    text-align: center;
  }
}
</style>
