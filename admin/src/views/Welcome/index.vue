<template>
  <div class="Welcome">
    <h1>This is an Welcome page</h1>
    <wButton text="按钮" @button-event="handleClick" />
  </div>
</template>
<script setup>
import wButton from "./components/w-button.vue";
import { useRouter } from 'vue-router'
const router = useRouter()

const handleClick = (data) => {
  console.log("按钮被点击了", data);
  router.push({ path: '/welcomeDetail' })
};
</script>
<style></style>
