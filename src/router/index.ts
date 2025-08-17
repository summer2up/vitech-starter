import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => setupLayouts(routes)
  //扩展
  // extendRoutes: (routes) =>{ ...setupLayouts([
  //   ...routes, {
  //     path: '/123123/123123'
  //     component: () => import('@/page/test.vue')
  //   }
  // ])}
})

export default router
