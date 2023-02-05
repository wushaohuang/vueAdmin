import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/index.js"
import 'element-theme-chalk';
import axios from "./axios";
//此处必须为axios，否则无法使用axios拦截，之前是./axios，排查错误排查了几个小时。但是现在还不知道为什么要这么写

import global from './globalFun'

Vue.prototype.$axios = axios;
Vue.use(Element)

Vue.config.productionTip = false

// require("./mock")
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
