<template>
    <view class="classify">
      分类页

      <text class="title">{{ counter.count }}</text>
        <view class="button" @tap="onAdd">ADD</view>
    </view>
  </template>
  
  <script>
  import { useCounterStore } from '../../stores/counter.js'
  export default {
    name: 'classify',
    setup() {
    const counter = useCounterStore()

    const onAdd = () => {
      counter.count++

      // with autocompletion ✨
      // counter.$patch({count: counter.count + 1})

      // or using an action instead
      // counter.increment()
    }

    return {
      counter,
      onAdd
    }
  }
  }
  </script>
  