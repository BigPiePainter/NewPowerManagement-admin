import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MainLayout from '../components/MainLayout.vue'

import ViewA from '../views/ViewA.vue'
import ViewB from '../views/ViewB.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      redirect: 'login',
      name: 'home',
      component: MainLayout,
      children: [
        {
          path: 'main',
          name: 'main',
          component: HomeView,
        },
        {
          path: 'viewa',
          name: 'viewa',
          component: ViewA,
        },
        {
          path: 'viewb',
          name: 'viewb',
          component: ViewB,
        },
        {
          path: '*',
          name: 'Error',
          component: HomeView,
        }
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
