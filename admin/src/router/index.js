 //  引入 createRouter 和 createWebHistory 实例函数 
 // createRouter 创建路由
 // createWebHistory 创建 history 路由模式
import { createRouter, createWebHistory } from 'vue-router'
// 引入布局组件
import layout from '../components/layout.vue'

// 权限路由  
const authRouter = [
  {
    // 路由路径
    path: '/login',
    // 路由name
    name: 'Login',
    // 路由元信息 额外参数
    meta: {
      // 路由标题 通过路由守卫 动态设置 当前页面的标题 
      title: '登录'
    },
    // 路由组件
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
