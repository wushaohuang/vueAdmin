import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/index.js"
import 'element-theme-chalk';
import request from "axios";

Vue.prototype.$axios = request;
Vue.use(Element)

Vue.config.productionTip = false

require("./mock")
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
