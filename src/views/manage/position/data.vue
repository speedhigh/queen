<template>
  <div>
    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="10"
      url="/position/getAllTraceList"
    >
      <template #default="slotProps">
        <el-table :data="slotProps.list" :border="true" stripe style="width: 100%">
          <el-table-column prop="date" label="日期" min-width="100" />
          <el-table-column prop="employeeName" label="员工" min-width="130" />
          <el-table-column prop="startTime" label="开始时间" min-width="130" />
          <el-table-column prop="endTime" label="结束时间" min-width="130" />
          <el-table-column prop="stayCount" label="停留次数" min-width="130" />
          <el-table-column prop="totalDuration" label="总计停留时间（分钟）" min-width="130" />
          <el-table-column prop="maxDuration" label="最长停留时间（分钟）" min-width="130" />
          <el-table-column label="操作">
            <template #default="scope">
              <p class="text-primary cursor-pointer hover:font-bold hover:underline" @click="removeStaff(scope.row)">查看当日轨迹图</p>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-pagination>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const params = ref({})
</script>