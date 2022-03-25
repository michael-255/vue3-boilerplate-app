import { createRouter, createWebHistory } from 'vue-router'
import { Views, Layouts } from '../constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: Views.DASHBOARD,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.DASHBOARD}.vue`),
    },
    {
      path: '/about',
      name: Views.ABOUT,
      meta: { layout: Layouts.SIMPLE },
      component: () => import(`../views/${Views.ABOUT}.vue`),
    },
    {
      path: '/:pathMatch(.*)*', // 404
      name: Views.NOTFOUND,
      meta: { layout: Layouts.SIMPLE },
      component: () => import(`../views/${Views.NOTFOUND}.vue`),
    },
  ],
})

export default router
