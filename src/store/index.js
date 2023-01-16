import Vue from 'vue'
import Vuex from 'vuex'

import menus from "@/store/modules/menus";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token",token) /* 将token存储到token字段 */
      /* localStorage.getItem("key") 获取指定key本地存储的值 */
    }
  },
  actions: {
  },
  modules: {
    menus
  }
})
