<template>
  <div class="relative">
    <map-container :path="path" :stay="stay" />
    <div class="absolute z-20 top-8 left-8 space-x-8">
      <!-- 选择员工 -->
      <el-dropdown trigger="click">
        <div class="w-[300px] h-[46px] bg-white rounded shadow flex items-center px-4">
          <p class="text-sm text-gray-600">{{ staff.title }}</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="w-[300px] max-h-[500px] overflow-y-scroll">
            <el-dropdown-item 
              v-for="(item, index) in staff.list" 
              :key="index"
              @click="selStaff(item.name, item.tid)"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 选择时间段 -->
      <el-dropdown>
        <div class="w-[300px] h-[46px] bg-white rounded shadow flex items-center px-4">
          <p class="text-sm text-gray-600">选择时间范围</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="w-[300px] max-h-[500px] overflow-y-scroll">
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import api from '/src/api/index.js'
import MapContainer from '/src/components/MapContainer.vue'

const list = ref({
  points: [],
  stayPoints: []
})
const path = ref([])
const stay = ref([])

const getMapData = function(mapData) {
  if(mapData.points) {
    for(let index = 0; index < mapData.points.length; index++) {
      let item = mapData.points[index]
      let i = item.location.indexOf(',')
      path.value[index] = [item.location.slice(0,i), item.location.slice(i + 1)]
    }
  }
  if(mapData.stayPoints) {
    for(let index = 0; index < mapData.stayPoints.length; index++) {
      let item = mapData.stayPoints[index]
      let i = item.location.indexOf(',')
      stay.value[index] = {
        x: item.location.slice(0, i),
        y: item.location.slice(i + 1),
        address: item.address,
        time: Math.round([item.endTime - item.startTime]/60000)
      }
    }
  }
}

const getPointList = function(tid = '550801603') {
  api.get('/position/getUserTacePositionPointList', { tid: tid, traceid: '' }).then((res) => {
    if(res.data.code === 20000) {
      list.value = res.data.data
      getMapData(res.data.data)
    }
  })
} 

const staff = reactive({
  title: '选择员工',
  list: []
})
// 获取人员
api.get('/position/getAllSalseList').then((res) => {
  if(res.data.code === 20000) staff.list = res.data.data
})
const selStaff = function(name, tid) {
  staff.title = name
  getPointList(tid)
}

</script>