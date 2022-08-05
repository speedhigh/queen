export default [
  /**** 账号管理 ****/
  {
    path: '/admin/account',
    component:() => import('../views/admin/account/index.vue'),
    meta: {
      name: 'AdminAccount',
      role: [1, 2]
    }
  },

  /**** 业务下发管理 ****/
  {
    path: '/admin/business',
    component:() => import('../views/admin/business/index.vue'),
    meta: {
      name: 'AdminBusiness',
      role: [1, 2]
    }
  },
  // 添加商品
  {
    path: '/admin/business/addproduct',
    component:() => import('../views/admin/business/addproduct.vue'),
    meta: {
      name: 'AdminBusiness',
      role: [1, 2]
    }
  },
]