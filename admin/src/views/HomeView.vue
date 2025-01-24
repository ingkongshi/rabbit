<script setup>
import TheWelcome from "../components/TheWelcome.vue";

import { useAccountStore } from "@/stores/account";
const store = useAccountStore();

</script>

<template>
  <main class="container">
    <h1>欢迎用户 {{store.userACCount }} , This is an home page</h1>
    <TheWelcome />
  </main>
</template>

<style scoped>
  .container {
    padding: 30px;
  }
</style>
