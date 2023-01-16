import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import store from "@/store";
import axios from "axios";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: "首页"
        },
        component: () => import('@/views/Index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  axios.get("/sys/menu/nav",{
    headers: {
      Authorization: localStorage.getItem("token")
    }
  }).then(res => {
    console.log('this.data')
    console.log(res.data)
    store.commit("setMenuList", res.data.data.nav)
    store.commit("setPermList", res.data.data.authoritys)

  })
  next()
})

export default router
