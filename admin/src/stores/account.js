import { defineStore } from "pinia";

export const useAccountStore = defineStore("userInfo", {
  state: () => ({
    account: "",
    password: "",
    token: "",
  }),
  getters: {
    userACCount: (state) => state.account,
    userPassword: (state) => state.password,
    userToken: (state) => state.token,
  },
  actions: {
    saveUserInfo(data) {
      this.account = data.account;
      this.password = data.password;
      this.token = data.token;
    },
  },
});
