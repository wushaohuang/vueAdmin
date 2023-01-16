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

    let hasRoute = store.state.menus.hasRoute

    if (!hasRoute) {
      //拿到menuList
      store.commit("setMenuList", res.data.data.nav)
      //拿到用户权限
      store.commit("setPermList", res.data.data.authoritys)

      //绑定动态路由
      let newRoutes = router.options.routes

      res.data.data.nav.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(e => {
            // 转成路由
            let route = menuToRoute(e)

            //把路由添加到路由管理中
            if (route) {
              newRoutes[0].children.push(route)
            }
          })
        }
      })
      router.addRoutes(newRoutes)

      hasRoute = true
      store.commit("changeRouteStatus", hasRoute)
    }

  })
  next()
})

//导航转成路由
const menuToRoute = (menu) => {
  if (!menu.component) {
    return null
  }
  return {
    name: menu.name,
    path: menu.path,
    // meta给无关参数赋值
    meta: {
      icon: menu.icon,
      title: menu.title
    },
    component: () => import('@/views/' + menu.component + '.vue')
  }
}

export default router
