import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import store from "@/store";

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
  let hasRoute = store.state.menus.hasRoute
  let menus = store.state.menus.menuList
  let token = localStorage.getItem("token")
  if (to.path === '/login') {
    console.log("login!!!!")
  } else if (!token) {
    console.log("还没有token")
    next({path: "/login"})
  }else if (!hasRoute){
    let newRoutes = router.options.routes
    axios.get("/sys/menu/nav", {headers:{
      Authorization: localStorage.getItem("token")
      }}).then(res => {
        console.log(res.data.data)
        store.commit("setMenuList", res.data.data.nav)
        store.commit("setPermList", res.data.data.authoritys)
      res.data.data.nav.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(e => {
            let route = menuToRoute(e)
            if(route) {
              newRoutes[0].children.push(route)
            }
          })
        }
      })
    })
    console.log("oldRputes --------------------")
    console.log(newRoutes)
    store.commit("changeRouteStatus", true)
    next({path: to.path})
  } else {
    console.log("已经有路由了---------------------")
    next()
  }
})

const menuToRoute = (menu) => {
  console.log("正在添加menu******")
  console.log(ment)
  if (!menu.component) {
    return null
  }
  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      ivon: menu.icon,
      title: menu.title
    }
  }
  route.component = () => import('@/views/' + menu.component + '.vue')
  return route
}

export default router
