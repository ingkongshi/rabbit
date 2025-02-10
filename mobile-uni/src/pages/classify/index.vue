<template>
  <view>
    <view class="search">搜索</view>
    <view class="classify">
      <!-- <text class="title">{{ counter.count }}</text>
      <view class="button" @tap="onAdd">ADD</view> -->

      <scroll-view scroll-y scroll-with-animation :scroll-into-view="scrollIndex" class="classify-list">
          <view class="classify-item" :class="{activeTab: tabId === item.id}" v-for="item in list" :key="item.id" :id="`tab_${item.id}`" @click="selectTab(item)">
            {{ item.name }}
          </view>
      </scroll-view>
      
      <scroll-view scroll-y class="product">
        <productListItem v-for="v in productList" :data="v" @button-event="handleClick"></productListItem>
      </scroll-view>
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

  // 引入生命周期函数
  import { onLoad, onShow } from "@dcloudio/uni-app"
  // 引入 vue 的 ref 函数
  import { ref } from 'vue'
  // 引入 商品展示组件
  import productListItem from '../index/productListItem.vue'

  const list = ref([{id: -1, name: '全部'}]);
  const tabId = ref(-1);
  const scrollIndex = ref('tab_-1');
  const productList = ref([]);

  // 生命周期函数 -- 页面挂载时会触发该函数  一般页面请求都放在这个函数中
  onLoad(()=>{
    getClassifyTab()
  })

  // 获取分类数据
  const getClassifyTab = () => {
    for (let i = 0; i < 30; i++) {
      list.value.push({ id: i, name: '分类' + i })
    }

    for (let i = 0; i < 20; i++) {
      productList.value.push({
        id: i,
        name:  '全部' + '-'+'商品' + i,
        price: (100 + i).toFixed(2),
        description: '商品描述' + i,
        img: 'https://test-namek.oss-cn-hangzhou.aliyuncs.com/product/cdaec1adedd58cf6b80d05937b379ee01b5adc9548f92261aaf08dc430025bd3oror.png',
        num: i
      })
    }
  }

  // 分类点击事件
  const selectTab = (data) => {
    tabId.value = data.id
    scrollIndex.value = 'tab_' + data.id
    productList.value = []
    for (let i = 0; i < 20; i++) {
      productList.value.push({
        id: i,
        name: data.name + '-' + '商品' + i,
        price: (100 + i).toFixed(2),
        description: '商品描述' + i,
        img: 'https://test-namek.oss-cn-hangzhou.aliyuncs.com/product/cdaec1adedd58cf6b80d05937b379ee01b5adc9548f92261aaf08dc430025bd3oror.png',
        num: i
      })
    }
  }
  // 商品点击事件
  const handleClick = (e) => {
    uni.navigateTo({
      url: '/pages/product/index?id=' + e
    })
  }
  </script>

  <style scoped>
    .search {
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      background-color: #d1d1d1;
    }
    uni-page-body {
      height: 100%;
    }
    .classify {
      display: flex;
      height: 100%;
    }
    .classify-list {
      width: 200rpx;
      height: 100%;
    }
    .classify-item {
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      border-bottom: 1rpx solid #ccc;
    }
    .activeTab {
      color: red;
    }
    .product {
      flex: 1;
      height: 100%;
      padding: 20rpx;
      box-sizing: border-box;
    }
  </style>
  