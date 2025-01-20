// 引入 store 构造 函数
import { defineStore } from "pinia";

// 定义一个用户账户 store 模块  https://pinia.vuejs.org/zh/core-concepts/
// 第一个参数是模块名 应用中 Store 的唯一 ID。，第二个参数是模块的配置对象
// store 的配置对象中可以定义 state、getters、actions 等属性

/**
 * 使用方式  
 * 1. 引入  import { useAccountStore } from '@/stores/account'
 * 2. const store = useAccountStore()
 * 3. store.accout // store.password  // store.token
 * 4. store.saveUserInfo({account: 'admin', password: '123456', token: 'xxxxx'})
 * 5. store.userACCount // store.userPassword // store.userToken
 */
export const useAccountStore = defineStore("userInfo", {
  // state 定义了 store 的状态， https://pinia.vuejs.org/zh/core-concepts/state.html
  state: () => ({
    account: "",
    password: "",
    token: "",
  }),
  // getters 定义了 store 的计算属性，可以用来获取 store 的状态 https://pinia.vuejs.org/zh/core-concepts/getters.html
  getters: {
    userACCount: (state) => state.account,
    userPassword: (state) => state.password,
    userToken: (state) => state.token,
  },
  // actions 定义了 store 的方法，可以用来修改 store 的状态 https://pinia.vuejs.org/zh/core-concepts/actions.html
  actions: {
    saveUserInfo(data) {
      this.account = data.account;
      this.password = data.password;
      this.token = data.token;
    },
  },
});
