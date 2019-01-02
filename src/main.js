import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import echarts from 'echarts'
import store from './vuex/index'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(echarts)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
