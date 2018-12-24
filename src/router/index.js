import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login.vue'
import Signup from '@/components/Signup/Signup.vue'
import User from '@/components/User/User.vue'
import Chart from '@/components/Chart/Chart.vue'
//import store from '@/vuex/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/Chart',
      name: 'Chart',
      component: Chart
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let token = store.state.token
//   if (to.meta.requiresAuth) {
//     if (token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
