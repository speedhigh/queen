<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-8">
      <div class="flex items-center">
        <p class="text-sm flex-shrink-0">手机号：</p>
        <div class="w-56">
          <el-input v-model="params.mobile" placeholder="请输入手机号" clearable />
        </div>
      </div>
      <div class="flex items-center">
        <p class="text-sm flex-shrink-0">物流单号：</p>
        <div class="w-56">
          <el-input v-model="params.expressnum" placeholder="请输入物流单号" clearable />
        </div>
      </div>
      <button 
        class="text-sm text-white bg-teal-500 rounded w-28 h-8 relative hover:bg-teal-600"
        :disabled="btnDisabled"
        @click="exportExcel"  
      >
        导出excel
      </button>
    </div>
    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="10"
      url="/logistic/getOrderList"
    >
      <template #default="slotProps">
        <el-table :data="slotProps.list" :border="true" stripe style="width: 100%">
          <el-table-column prop="id" label="订单ID" min-width="50" />
          <el-table-column prop="addressee" label="收货人" min-width="90" />
          <el-table-column prop="mobile" label="手机号" min-width="120" />
          <el-table-column prop="address" label="收货地址" min-width="280" />
          <el-table-column prop="product" label="订单信息" min-width="250" />
          <el-table-column prop="orderPrice" label="订单金额" min-width="100" />
          <el-table-column prop="logisticNum" label="物流单号" min-width="100" />
          <el-table-column label="操作">
            <template #default="scope">
              <p class="text-primary cursor-pointer hover:font-bold hover:underline" @click="toDetail(scope.row)">查看详情</p>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-pagination>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { pickBy, _} from 'lodash'
import api from '/src/api/index.js'
import downLoadXls from '/src/until/downLoadXls.js'
import BasePagination from '/src/components/BasePagination.vue'

const router = useRouter()

const params = ref({
  mobile: '',
  expressnum: '',
})

const toDetail = function(e) {
  router.push(`/csr/detail/${e.id}`)
}

const btnDisabled = ref(false)
const exportExcel = function() {
  btnDisabled.value = true
  api.getBlob('/excel/getOrdersAllPage_ToExcel_Poi', pickBy(params.value)).then((res) => {
    downLoadXls(res)
    setTimeout(() => btnDisabled.value = false, 300)
  })
}
</script>