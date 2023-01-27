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
          name: 'Home',
          role: [1, 2, 3, 4]
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
          name: 'ChangePwd',
          role: [1, 2, 3, 4]
        }
      },

      /** ---404--- **/
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component:() => import('../views/404/index.vue'),
        meta: {
          role: [1, 2, 3, 4]
        }
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
  // JSON.parse(sessionStorage.getItem('user'))
  if(to.path === '/login') return next()
  if(!window.sessionStorage.getItem("token")) return next('/login')
  if(to.meta.role.length > 0 && !to.meta.role.includes(JSON.parse(window.sessionStorage.getItem('user')).roleid)) return next('/404')
  next()
})

export default router