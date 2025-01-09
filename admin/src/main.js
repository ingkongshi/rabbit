import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./assets/main.css";
import { createApp } from "vue";
import { createPinia, storeToRefs } from "pinia";

import App from "./App.vue";
import router from "./router";


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus);

app.use(createPinia());
app.use(router);

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || "My App";
  const token = localStorage.getItem("token");

  // todo： 未登录或者token 过期  跳转登录页
  if (!token && to.path !== "/login") {
    next({ path: '/login' })
  } 
  next();
});

app.mount("#app");
