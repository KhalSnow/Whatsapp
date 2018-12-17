import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User/User.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
