import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login.vue'
import Signup from '@/components/Signup/Signup.vue'
import User from '@/components/User/User.vue'
import Chart from '@/components/Chart/Chart.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Signup',
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
