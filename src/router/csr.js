export default [
  /**** 订单信息 ****/
  {
    path: '/csr/order',
    component:() => import('../views/csr/order/index.vue'),
    meta: {
      name: 'CSROrder',
      role: [1, 2]
    }
  },

  // 业务详情
  {
    path: '/csr/detail/:id',
    component:() => import('../views/csr/order/detail.vue'),
    meta: {
      name: 'CSROrder',
      role: [1, 2]
    }
  },
]