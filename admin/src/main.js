import {showMessage} from './utils/utils.js'
// 引入 element-ui 
import ElementPlus from "element-plus";
// 引入 element-ui 样式
import "element-plus/dist/index.css";
// 引入 element-ui 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 全局样式 此处引入会影响所有的养殖
import "./assets/main.css";
// 引入 vue 实例构造器
import { createApp } from "vue";
// 引入 pinia 实例构造器
import { createPinia } from "pinia";
// 引入 根组件 -- 根组件就是整个项目的入口文件 所有页面的切换都是在 App.vue 中进行的
import App from "./App.vue";
// 引入 vue-router 路由
import router from "./router";

// 创建一个vue应用实例
const app = createApp(App);
// app.component() 注册全局组件 使组件可以在任何地方使用。
// 把 element-ui 图标 全部注册成全局组件  就可以在任何地方使用 无需再次引入
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.use() 注册插件  将插件的功能集成到 Vue 实例中。

// 注册 element-ui 插件
app.use(ElementPlus);
// 注册 pinia 状态管理 插件
app.use(createPinia());
// 注册 vue-router 路由插件
app.use(router);

// vue-router 路由守卫
router.beforeEach(async (to, from, next) => {
  // to.meta.title 是路由配置中定义的 meta.title
  // document.title 是当前页面的标题
  // 根据路由配置的title动态修改页面标题
  document.title = to.meta.title || "My App";
  const token = localStorage.getItem("token");

  // todo： 未登录或者token 过期  跳转登录页
  if (!token && to.path !== "/login") {
    next({ path: '/login' })
  } else {
    next();
  }
});

// 将应用实例挂载在一个容器元素中。#app是id为app的dom元素，位置在index.html中
app.mount("#app");
