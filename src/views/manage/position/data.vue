<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-8">
      <div class="flex items-center">
        <p class="text-sm flex-shrink-0">员工姓名：</p>
        <div class="w-40">
          <el-input v-model="params.name" placeholder="请输入员工姓名" clearable />
        </div>
      </div>
      <div class="w-96">
        <el-date-picker
          v-model="date"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="changeDate"
        />
      </div>
    </div>
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
              <p class="text-primary cursor-pointer hover:font-bold hover:underline" @click="toDetail(scope.row)">查看当日轨迹图</p>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-pagination>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'

const route = useRoute()
const router = useRouter()
const date = ref('')
const params = ref({
  name: route.query.name ? route.query.name : '',
  startTime: '',
  endTime: ''
})

const changeDate = function() {
  if(date.value) {
    params.value.startTime = dayjs(date.value[0]).format('YYYY-MM-DD')
    params.value.endTime = dayjs(date.value[1]).format('YYYY-MM-DD')
  } else {
    params.value.startTime = params.endTime = ''
  }
}

const toDetail = function(row) {
  router.push(`/manage/position/date/${row.uid}?n=${row.employeeName}&d=${dayjs(row.startTime).format('YYYY-MM-DD')}`)
}
</script>