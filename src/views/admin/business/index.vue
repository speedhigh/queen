<template>
  <div class="space-y-4">
    <button 
      class="text-sm text-white bg-teal-500 w-28 h-10 rounded hover:bg-teal-600"
      @click="$router.push('/admin/business/addproduct')"
    >
      添加商品
    </button>
    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="10"
      url="/product/getSaleMainList"
    >
      <template #default="slotProps">
        <el-table :data="slotProps.list" :border="true" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" min-width="20" />
        <el-table-column prop="muzimobileproid" label="木子网id" min-width="20" />
          <el-table-column prop="name" label="商品名称" min-width="100" />
          <el-table-column prop="skunum" label="sku" min-width="40" />
          <el-table-column prop="price" label="价格" min-width="30" />
          <el-table-column prop="salenum" label="已售数量" min-width="30" />
          <!-- <el-table-column prop="inserttime" label="添加时间" min-width="60" /> -->
          <!-- <el-table-column prop="salename" label="添加人" min-width="120" /> -->
          <el-table-column #default="scope" label="操作" min-width="20">
            <p class="text-primary cursor-pointer hover:font-bold hover:underline" @click="removeStaff(scope.row)">删除商品</p>
          </el-table-column>
        </el-table>
      </template>
    </base-pagination>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '/src/api/index.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import BasePagination from '/src/components/BasePagination.vue'

const params = ref({})
const paginationRef = ref()
const removeStaff = function(row) {
  ElMessageBox.confirm('你确定要删除该商品吗?','提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    api.delete('/product/deleteSaleMain', {id: row.id}).then((res) => {
      if(res.data.code === 20000) {
        ElMessage({type: 'success', message: '删除成功'})
        paginationRef.value.askApi(false)
      }
    })
  }).catch()
}
</script>