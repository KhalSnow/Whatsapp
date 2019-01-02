import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login.vue'
import Signup from '@/components/Signup/Signup.vue'
import store from '@/vuex/index'
import Layout from '@/views/layout/Layout.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/user',
      hidden: true
    },
    /*{
      path: '/home',
      component: Login
    },
    {
      path: '/signup',
      component: Signup
    },*/
    {
      path: '/user',
      meta: {
        requireAuth: true
      },
      component: Layout,
      children: [
        {
          path: "/user",
          component: () => import('@/components/User/User.vue')
        }
      ]
    },
    {
      path: '/chart',
      meta: {
        requireAuth: true
      },
      component: Layout,
      children: [
        {
          path: "/chart",
          component: () => import('@/components/Chart/Chart.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = store.state.token
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
