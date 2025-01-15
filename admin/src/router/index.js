import { createRouter, createWebHistory } from 'vue-router'
import layout from '../components/layout.vue'

// 权限路由  
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
// 基本路由
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
          hideMenu: false,
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
  {
    path: '',
    name: 'Welcome',
    component: layout,
    redirect: '/welcome',
    meta: {
      title: 'welcome'
    },
    children: [
      {
        path: 'welcomeIndex',
        name: 'WelcomeIndex',
        component: () => import("../views/Welcome/index.vue"),
        meta: {
          title: 'welcome',
        }
      },
      {
        path: 'welcomeDetail',
        name: 'WelcomeDetail',
        component: () => import("../views/Welcome/detail.vue"),
        hideMenu: true,
        meta: {
          title: 'welcomeDetail',
        }
      },
    ]
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 分开是为了侧边栏好生成
  routes: [...authRouter, ...routes],
})
export const menuList = routes;
export default router
