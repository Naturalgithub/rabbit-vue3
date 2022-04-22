import { RouterView, createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout'
import Home from '@/views/home/index'
import store from '@/store'
import { h } from 'vue'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/category/:id',
        component: () => import('@/views/category')
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/category/sub')
      },
      {
        path: '/product/:id',
        component: () => import('@/views/goods')
      },
      {
        path: '/cart',
        component: () => import('@/views/cart')
      },
      {
        path: '/member',
        component: () => import('@/views/member/layout'),
        children: [
          {
            // 个人中心
            path: '/member',
            component: () => import('@/views/member/home')
          },
          {
            path: '/member/order',
            component: { render: () => h(RouterView) },
            children: [
              {
                // 订单
                path: '/member/order',
                component: () => import('@/views/member/order')
              },
              {
                // 订单详情
                path: '/member/order/:id',
                component: () => import('@/views/member/order/detail')
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/login/callback',
    component: () => import('@/views/login/callback')
  },
  {
    path: '/member/checkout',
    component: () => import('@/views/member/pay/checkout')
  },
  { path: '/member/pay', component: () => import('@/views/member/pay/index') },
  {
    path: '/demo',
    component: () => import('@/views/demo')
  },
  {
    path: '/pay/callback',
    component: () => import('@/views/member/pay/result')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})
router.beforeEach((to, from, next) => {
  // 判断用户有没有登录
  const token = store.state.user.profile.token
  if (token) {
    next()
  } else {
    if (to.path.includes('/member')) {
      // 需要登录才能访问
      localStorage.setItem('redirectUrl', to.fullPath)
      next({
        path: '/login',
        query: {
          redirectUrl: to.fullPath
        }
      })
    } else {
      next()
    }
  }
})

export default router
