<template>
  <view class="content">
    <view class="uni-margin-wrap">
			<swiper class="swiper" circular autoplay  indicatorDots :interval="interval">
				<swiper-item>
					<view class="swiper-item uni-bg-red">轮播图1</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">轮播图2</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">轮播图3</view>
				</swiper-item>
			</swiper>
		</view>

    <view class="list">
      <scroll-view scroll-y>
        <productListItem v-for="v in productList" :data="v" @button-event="handleClick"></productListItem>
      </scroll-view>
    </view>

  </view>
</template>

<script setup>
  import { onLoad } from "@dcloudio/uni-app"
  import { reactive, ref } from 'vue'
  import productListItem from './productListItem.vue'
  const interval = ref(3000)
  const productList = ref([]);

  onLoad(()=>{
    for (let i = 0; i < 20; i++) {
      productList.value.push({
        id: i,
        name: '商品' + i,
        price: (100 + i).toFixed(2),
        description: '商品描述' + i,
        img: 'https://test-namek.oss-cn-hangzhou.aliyuncs.com/product/cdaec1adedd58cf6b80d05937b379ee01b5adc9548f92261aaf08dc430025bd3oror.png',
        num: i
      })
    }
	})

  const handleClick = (e) => {
    uni.navigateTo({
      url: '/pages/product/index?id=' + e
    })
  }
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.uni-margin-wrap {
  width: 690rpx;
  width: 100%;
}
.swiper {
  height: 300rpx;
}
.swiper-item {
  display: block;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
}
.swiper-list {
  margin-top: 40rpx;
  margin-bottom: 0;
}
.uni-common-mt {
  margin-top: 60rpx;
  position: relative;
}
.info {
  position: absolute;
  right: 20rpx;
}
.uni-padding-wrap {
  width: 550rpx;
  padding: 0 100rpx;
}
.uni-bg-green {
  background: #39b54a;
}
.uni-bg-red {
  background: #fa5151;
}
.uni-bg-blue {
  background: #007aff;
}

.list {
  width: 100%;
  padding: 20rpx;
  box-sizing: border-box;
}

</style>
