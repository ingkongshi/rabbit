[文档](https://uniapp.dcloud.net.cn/tutorial/)


## Project Setup

- mp-weixin 微信小程序
- mp-alipay 支付宝小程序
- mp-toutiao    抖音小程序
- h5    普通H5

### Install Dependencies
```sh
pnpm install
```

### Compile and Hot-Reload for Development


```sh
pnpm run dev:h5
```

### Compile and Minify for Production

```sh
pnpm run build:h5
```

## 项目目录结构

├── dist                        编译结果目录
|
|
├── src                         源码目录
|   ├── pages                   页面文件目录
|   |   └── index               index 页面目录
|   |       └── index.vue       index 页面逻辑
|   |   └── login               login 页面目录
|   |       └── index.vue       login 页面逻辑
|   ├── stores                  store仓库
|   |
|   ├── App.vue                 项目入口主组件
|   ├── main.js                 项目入口文件
|   ├── manifest.json           应用配置
|   └── pages.json              页面路由
|