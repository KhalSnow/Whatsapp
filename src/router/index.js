import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User/User.vue'
import Chart from '@/components/Chart/Chart.vue'

Vue.use(Router)

export default new Router({
  routes: [
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
