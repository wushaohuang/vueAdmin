import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/index.js"
import axios from 'axios'
import 'element-theme-chalk';

Vue.use(Element)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

require("./mock")
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
