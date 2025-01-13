<template>
    <view class="my">
      个人中心
      <button @click="login">登录</button>
    </view>
  </template>
  
  <script>
  export default {
    name: 'My',
    components: {
  
    },
    methods: {
      login() {
        console.log('登录')
        uni.navigateTo({
            url: '/pages/login/index'
        })
      }
    }
  }
  </script>
  