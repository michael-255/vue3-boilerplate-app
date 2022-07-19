import { createRouter, createWebHistory } from 'vue-router'
import { Views, Layouts } from '@/constants/ui-enums'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: Views.DASHBOARD,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.DASHBOARD}.vue`),
    },
    {
      path: '/active',
      name: Views.ACTIVE,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.ACTIVE}.vue`),
    },
    {
      path: '/example',
      name: Views.EXAMPLE,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.EXAMPLE}.vue`),
    },
    {
      path: '/logs',
      name: Views.LOGS,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.LOGS}.vue`),
    },
    {
      path: '/options',
      name: Views.OPTIONS,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.OPTIONS}.vue`),
    },
    {
      path: '/about',
      name: Views.ABOUT,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.ABOUT}.vue`),
    },
    {
      path: '/:pathMatch(.*)*', // 404 Not Found
      name: Views.NOT_FOUND,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.NOT_FOUND}.vue`),
    },
  ],
})

export default router
