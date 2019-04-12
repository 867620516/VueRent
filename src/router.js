import Vue from 'vue'
import Router from 'vue-router'

// 引入公共组件
import Login from '@/components/login'
import Regin from '@/components/regin'
import Home from '@/components/home'

// 引入前端组件
import ConHome from '@/components/con-home'
import Products from '@/components/page/products'

// 商品子组件
import ProductList from '@/components/page/product/productlist'
// import ProductContent from '@/components/page/product/productcontent'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    hidden: true,
    type: 'client',
    component: Home,
    children: [
      {
        path: '/',
        hidden: true,
        component: ConHome
      },
      {
        path: '/products',
        name: '商品',
        class: 'el-icon-goods',
        component: Products,
        redirect: '/product/全部商品',
        children: [
          {
            // 这里用的动态路由，需要一个冒号：
            path: '/product/:class',
            component: ProductList
          }
        ]
      }
      /* {
        path: '/product/:class/:productname',
        hidden: true,
        component: ProductContent
      } */
    ]
  },
  {
    path: '/login',
    name: '',
    hidden: true,
    component: Login
  },
  {
    path: '/regin',
    name: '',
    hidden: true,
    component: Regin
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('./views/Index.vue'),
    meta: {
      needLogin: true
    }
  }
]

export default new Router({
  routes: constantRoutes,
  mode: 'history'
})
