export default [
  /**** 员工管理 ****/
  // 员工列表
  {
    path: '/manage/staff/list',
    component:() => import('../views/manage/staff/index.vue'),
    meta: {
      name: 'ManageStaffList'
    }
  },
  {
    path: '/manage/staff/add',
    component:() => import('../views/manage/staff/add.vue'),
    meta: {
      name: 'ManageStaffAdd'
    }
  },
  /**** 业务统计 ****/
  // 业务统计
  {
    path: '/manage/business/stats',
    component:() => import('../views/manage/business/index.vue'),
    meta: {
      name: 'ManageBusinessStats'
    }
  },

  // 业务详情
  {
    path: '/manage/business/detail/:id',
    component:() => import('../views/manage/business/detail.vue'),
    meta: {
      name: 'ManageBusinessStats'
    }
  },


  /**** 实时定位 ****/
  // 员工定位
  {
    path: '/manage/position/staff',
    component:() => import('../views/manage/position/staff.vue'),
    meta: {
      name: 'ManagePositionStaff'
    }
  },
  // 近期数据
  {
    path: '/manage/position/data',
    component:() => import('../views/manage/position/data.vue'),
    meta: {
      name: 'ManagePositionData'
    }
  }
]