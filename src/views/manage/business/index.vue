<template>
  <div>
    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="10"
      url="/business/employee"
    >
      <template #default="slotProps">
        <el-table :data="slotProps.list" :border="true" stripe style="width: 100%">
          <el-table-column prop="id" label="订单编号" min-width="90" />
          <el-table-column prop="salesName" label="销售姓名" min-width="90" />
          <el-table-column prop="customersName" label="客户姓名" min-width="90" />
          <el-table-column prop="inserttime" label="下单时间" min-width="180" />
          <el-table-column prop="totalprice" label="成交金额" min-width="100" />
          <el-table-column prop="rebates" label="返佣" min-width="60" />
          <el-table-column prop="state" label="状态" min-width="130" />
          <el-table-column label="操作" min-width="130">
            <template #default="scope">
              <p class="text-primary cursor-pointer hover:font-bold hover:underline" @click="toDetail(scope.row)">订单详情</p>
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
import BasePagination from '/src/components/BasePagination.vue'

const router = useRouter()
const params = ref({})
const toDetail = function(e) {
  router.push(`/manage/business/detail/${e.id}`)
}
</script>