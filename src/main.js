import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import qiniuUpload from './utils/uploadUi'
import mdUpload from './utils/mdupload'
import mdShow from './utils/mdshow'
import mangeMenu from './utils/mangemenu'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// use
Vue.use(mavonEditor)
Vue.component('qiniu-upload', qiniuUpload)
Vue.component('md-upload', mdUpload)
Vue.component('md-show', mdShow)
Vue.component('mange-menu', mangeMenu)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
/*  if (to.meta.needLogin) {
    if (window.sessionStorage) {
      next()
    } else {
      alert('session is null please login')
      next('/login')
    }
  } else {
    next()
  } */

  // 如果是去登录或注册，那就先把user移除
  if (to.path === '/login' || to.path === '/regin') {
    sessionStorage.removeItem('user')
    store.dispatch('logout')
  }
  let user = store.state.user

  // 如果用户没有登录且前往需要用户登录才能访问的页面，那就让他先登录
  if (!user && to.meta.requireUser) {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
