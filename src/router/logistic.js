export default [
  /**** 物流信息 ****/
  {
    path: '/logistic/list',
    component:() => import('../views/logistic/list/index.vue'),
    meta: {
      name: 'LogisticList'
    }
  },

  // 业务详情
  {
    path: '/logistic/detail/:id',
    component:() => import('../views/logistic/list/detail.vue'),
    meta: {
      name: 'LogisticList'
    }
  },
]