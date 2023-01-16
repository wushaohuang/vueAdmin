import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ({
    state: {
        menuList: [],
        permList: [],
        hasRoute: false
    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermList(state, perms) {
            state.permList = perms
        },
        changeRouteStatus(state, hasRoute) {
            state.hasRoute = hasRoute
        }
    },
    actions: {
    }
})
