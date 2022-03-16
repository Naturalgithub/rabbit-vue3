import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout'
const routes = [
  {
    path: '/',
    component: Layout
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
