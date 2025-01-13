import { createRouter, createWebHistory } from 'vue-router'
import layout from '../components/layout.vue'

const authRouter = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/login.vue'),
  },
]
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: layout,
    redirect: '/home',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import("../views/HomeView.vue"),
        meta: {
          title: 'Home',
        }
      }
    ]
  },
  {
    path: '',
    name: 'about',
    component: layout,
    redirect: '/about',
    meta: {
      title: '关于'
    },
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import("../views/AboutView.vue"),
        meta: {
          title: '关于',
          hideMenu: true,
        }
      }
    ]
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import("../views/member/member.vue"),
    meta: {
      title: '会员'
    },
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRouter, ...routes],
})
export const menuList = routes;
export default router
