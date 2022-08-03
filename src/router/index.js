import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/Layout/index.vue'
// 销售管理
import manage from './manage.js'
// 物流后台
import logistic from './logistic.js'
// 客服后台
import csr from './csr.js'
// 后台端
import admin from './admin.js'

const routes= [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: Layout,
    redirect: '/home',
    children: [
      /** ---首页--- **/
      {
        path: '/home',
        component:() => import('../views/index.vue'),
        meta: {
          name: 'Home'
        }
      },

      /** ------~后台端~------ **/
      ...admin,
 
      /** ------销售管理------ **/
      ...manage,

      /** ------物流后台------ **/
      ...logistic,

      /** ------客服后台------ **/
      ...csr,

      /**** 修改密码 ****/
      {
        path: '/changepwd',
        component:() => import('../views/changepwd/index.vue'),
        meta: {
          name: 'ChangePwd'
        }
      },

      /** ---404--- **/
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component:() => import('../views/404/index.vue')
      }
    ]
  },
  /** -----登录页----- **/
  {
    path: '/login',
    name: 'Login',
    component:() => import('../views/login/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem("token")
  if(!tokenStr) return next('/login')
  next()
})

export default router