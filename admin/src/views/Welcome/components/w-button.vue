<template>
  <div class="w-button">
    <button @click="$emit('buttonEvent', {msg: '按钮被点击了'})">{{text}}</button>
  </div>
</template>
<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
<style></style>
