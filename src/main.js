import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (window.sessionStorage) {
      next()
    } else {
      alert('session is null please login')
      next('/login')
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
