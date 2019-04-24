import Vue from 'vue'
import Vuex from 'vuex'

import { constantRoutes } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('user')) || '', // 登录用户
    constantRoutes: constantRoutes,
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.constantRoutes = constantRoutes.concat(routes)
    },
    // 用户登录
    LOGIN (state) {
      state.user = JSON.parse(sessionStorage.getItem('user'))
    },
    // 用户登出
    LOGOUT (state) {
      state.user = ''
    }
  },
  actions: {
    // 用户登录
    // 这里先来一个驱动LOGIN的东西就叫login吧
    login ({ commit }) {
      commit('LOGIN')
    },
    // 用户登出
    logout ({ commit }) {
      commit('LOGOUT')
    }
  }
})
