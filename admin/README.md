# admin

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### 文档
[vue-router](https://router.vuejs.org/zh/introduction.html)
[pinia](https://pinia.vuejs.org/zh/introduction.html)
[element-plus](https://element-plus.org/zh-CN/)


### 业务
1. 用户输入链接之后会 先运行 main.js 
2. main.js 中的 router.beforeEach 是路由守卫,在每次路由跳转之前都会执行;在此你可以判断用户是否登录,如果未登录则跳转到登录页面可以参考 文档 [路由守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#全局前置守卫)
3. app.vue 中的 router-view 是路由出口,所有的路由组件都会渲染到这个位置
