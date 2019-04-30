import Vue from 'vue'
import Router from 'vue-router'

// 引入公共组件
import Login from '@/components/login'
import Regin from '@/components/regin'
import Home from '@/components/home'

// 引入前端组件
import ConHome from '@/components/con-home'
import Products from '@/components/page/products'
import Manger from '@/components/page/manger'
import Users from '@/components/page/users'

// 商品子组件
import ProductList from '@/components/page/product/productlist'
import ProductContent from '@/components/page/product/productcontent'

// 工作台子组件
import MyHistory from '@/components/page/manger/history'
import My from '@/components/page/manger/my'
import MangerProds from '@/components/page/manger/mangerprods'
// 商品类组件
import AddProd from '@/components/page/manger/prods/addprod'
import AllProds from '@/components/page/manger/prods/allprods'

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
        show: true,
        component: Products,
        redirect: '/product/全部商品',
        children: [
          {
            // 这里用的动态路由，需要一个冒号：
            path: '/product/:class',
            component: ProductList
          }
        ]
      },
      {
        path: '/product/1/:productid',
        hidden: true,
        component: ProductContent
      },
      {
        path: '/manger',
        name: '工作台',
        redirect: '/manger/my',
        show: true,
        meta: {
          requireUser: true
        },
        component: Manger,
        // hasChild: true,
        children: [
          {
            path: '/manger/my',
            meta: {
              requireUser: true
            },
            name: '我的信息',
            component: My
            /* redirect: '/manger/my/userinfo',
            children: [
              {
                path: '/manger/my/userinfo',
                name: '基本信息',
                component: UserInfo
              },
              {
                path: '/manger/my/usericon',
                name: '修改头像',
                component: UserIcon
              }
            ] */
          },
          // 商品管理
          {
            path: '/manger/mangeprods',
            name: '商品管理',
            component: MangerProds,
            redirect: '/manger/mangeprods/allprods',
            children: [
              {
                path: '/manger/mangeprods/allprods',
                name: '我的租赁',
                component: AllProds
              },
              {
                path: '/manger/mangeprods/addprod',
                name: '发布租赁',
                component: AddProd
              }
            ]
          },
          {
            path: '/manger/history',
            name: '发货记录',
            meta: {
              requireUser: true
            },
            component: MyHistory
          }
        ]
      },
      {
        path: '/users/:userID',
        component: Users
      }
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
  }
]

export default new Router({
  routes: constantRoutes,
  mode: 'history'
})
