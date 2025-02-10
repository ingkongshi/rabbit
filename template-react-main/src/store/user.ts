import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { postLoginAPI, type loginDataType, type userInfoType } from '@/api/System/user';

/**
 * 用户信息store类型
 */
export interface usersStoreType {
  token: string;
  userInfo: userInfoType | null;
  setToken: (value: string) => void;
  login: (loginForm: loginDataType) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<usersStoreType>()(
  persist(
    (set) => ({
      token: '', // 登录token
      userInfo: null, // 用户信息

      setToken: (value: string) => set({ token: value }),

      setUserInfo: (value: userInfoType) => set({ userInfo: value }),

      login: async (loginForm: loginDataType) => {
        const { username, password } = loginForm;
        // const data = {
        //   id: 1,
        //   username: 'admin',
        //   password: '123456',
        //   nickname: '三棵杨树',
        //   avatar: 'https://avatars.githubusercontent.com/u/64878070?v=4',
        //   sign: '从来没有真正的绝境，只有心灵的迷途',
        //   token: 'adminToken',
        // }
        const { data } = await postLoginAPI({ username: username.trim(), password });
        set({ token: data.token }); // 保存用户token
        set({ userInfo: data.user });
      },

      logout: () => {
        set({ token: '' });
        set({ userInfo: null });
      },
    }),
    {
      // 进行持久化存储
      name: 'userStorage', // 本地存储的名称
    }
  )
);
