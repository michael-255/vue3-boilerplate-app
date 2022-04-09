import { createRouter, createWebHistory } from 'vue-router'
import { Paths, Views, Layouts } from '@/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: Paths.DASHBOARD,
    },
    {
      path: Paths.DASHBOARD,
      name: Views.DASHBOARD,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.DASHBOARD}.vue`),
    },
    {
      path: Paths.ABOUT,
      name: Views.ABOUT,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.ABOUT}.vue`),
    },
    {
      path: '/:pathMatch(.*)*', // 404 Not Found
      name: Views.NOTFOUND,
      meta: { layout: Layouts.DEFAULT },
      component: () => import(`../views/${Views.NOTFOUND}.vue`),
    },
  ],
})

export default router
