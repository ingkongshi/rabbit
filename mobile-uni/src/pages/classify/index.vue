<template>
    <view class="classify">
      <!-- <text class="title">{{ counter.count }}</text>
      <view class="button" @tap="onAdd">ADD</view> -->

      <view class="classify-list">
        <view class="classify-item" v-for="item in list" :key="item.id">
          {{ item.name }}
        </view>
      </view>

      <view class="product">

      </view>
    </view>
  </template>
  
  <script setup>
  import { useCounterStore } from '../../stores/counter.js'
  const counter = useCounterStore()
  const onAdd = () => {
    counter.count++

    // with autocompletion ✨
    // counter.$patch({count: counter.count + 1})

    // or using an action instead
    // counter.increment()
  }

    import { onLoad } from "@dcloudio/uni-app"
    import { ref } from 'vue'
    const list = ref([]);
    onLoad(()=>{
      const height = uni.getSystemInfoSync().safeArea.height
      console.log('height: ', height);
      for (let i = 0; i < 3; i++) {
        list.value.push({ id: i, name: '分类' + i })
      }
    })
  </script>

  <style scoped>
    .classify {
      display: flex;
      height: 100%;
    }
    .classify-list {
      width: 200rpx;
    }
    .classify-item {
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      border-bottom: 1rpx solid #ccc;
    }
  </style>
  