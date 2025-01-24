<template>
  <view class="listItem" @click="$emit('buttonEvent', data)">
    <img class="productImg" :src="data.img" alt="商品图片" />
    <view class="productInfo">
      <view>{{data.name}}</view>
      <view>{{data.description}}</view>
      <view>商品价格 ￥{{data.price}}</view>
      <view>商品数量 x{{data.num}}</view>
    </view>
  </view>
</template>

<script setup>
    defineProps(['data'])
</script>

<style scoped>
.listItem {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20rpx;
}
.productImg {
  width: 200rpx;
  height: 200rpx;
}
.productInfo {
  margin-left: 20rpx;
  flex: 1;
}
</style>
