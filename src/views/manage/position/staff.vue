<template>
  <div class="relative">
    <map-container :path="path" :stay="stay" />
    <div class="absolute flex items-center z-20 top-8 left-8 space-x-8">
      <!-- 选择员工 -->
      <el-dropdown trigger="click">
        <div class="w-64 h-[40px] bg-white rounded border flex items-center px-4">
          <p class="text-sm text-gray-600">{{ staff.title }}</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="w-64 max-h-[500px] overflow-y-scroll">
            <el-dropdown-item 
              v-for="(item, index) in staff.list" 
              :key="index"
              @click="selStaff(item.name, item.id, item.tid)"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 选择时间段 -->
      <div class="space-x-4">
        <el-time-select
          v-model="startTime"
          :disabled="timeDisabled"
          :max-time="endTime"
          size="large"
          placeholder="开始时间"
          start="07:00"
          step="00:15"
          end="20:00"
          @change="changeStartTime"
        />
        <el-time-select
          v-model="endTime"
          :disabled="startTime.length === 0 || path.length === 0"
          :min-time="startTime"
          size="large"
          placeholder="结束时间"
          start="07:00"
          step="00:15"
          end="20:00"
          @change="changeEndTime"
        />
      </div>
    </div>
    <div 
      v-if="staff.title !== '选择员工'"
      class="absolute z-20 bottom-8 left-8 flex space-x-8 cursor-default"
    >
      <div class="h-[40px] bg-white px-4 shadow-lg rounded text-sm text-gray-600 flex items-center space-x-8">
        <p>当前正在浏览 {{ staff.title }} 的运动轨迹</p>
        <p>全程 {{ distance }}km</p>
        <p>用时 {{ time }}</p>
      </div>
      <button 
        class="h-[40px] w-48 bg-primary text-white text-sm rounded shadow-lg opacity-90 hover:bg-red-400"
        @click="$router.push(`/manage/position/data?name=${staff.title}`)"
      >
        查看该员工近期运动轨迹
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '/src/api/index.js'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { pickBy } from 'lodash'
import formatSeconds from '/src/until/formatSeconds.js'
import MapContainer from '/src/components/MapContainer.vue'

const path = ref([])
const stay = ref([])
const time = ref('')
const distance = ref(0)

const getMapData = function(mapData) {
  // 路线信息
  if(mapData.points) {
    for(let index = 0; index < mapData.points.length; index++) {
      let item = mapData.points[index]
      let i = item.location.indexOf(',')
      path.value[index] = [item.location.slice(0,i), item.location.slice(i + 1)]
    }
  }
  // 停留信息
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
// 根据某人tid 获取路线信息 和 停留信息
const getPointList = function(tid = '550801603') {
  api.get('/position/getUserTacePositionPointList', { tid: tid, traceid: '' }).then((res) => {
    if(res.data.code === 20000) {
      timeDisabled.value = false
      getMapData(res.data.data)
      time.value = formatSeconds(res.data.data.time) 
      distance.value = res.data.data.distance/1000
    } else {
      timeDisabled.value = true
      stay.value = path.value = []
      ElMessage({type: 'warning', message: res.data.msg})
    }
  })
} 

// 根据 时间段 获取当日的 路线信息 和 停留信息
const getTracebydate = function() {
  let today = dayjs(new Date()).format('YYYY-MM-DD')
  let params = {
    date: today,
    start: startTime.value ? today + ' ' + startTime.value : '',
    end: endTime.value ? today + ' ' + endTime.value : '',
    uid: staff.id
  }
  api.get('/position/getTracebydate', pickBy(params)).then((res) => {
    if(res.data.data.points.length > 0) {
      getMapData(res.data.data)
      time.value = formatSeconds(res.data.data.time)
      distance.value = res.data.data.distance/1000
    } else {
      ElMessage({type: 'warning', message: '该时间范围内没有轨迹'})
    }
  })
}


/* 员工相关 */
const staff = reactive({
  title: '选择员工',
  list: [],
  id: ''
})
// 获取人员
api.get('/position/getAllSalseList').then((res) => {
  if(res.data.code === 20000) staff.list = res.data.data 
})
// 选择人员
const selStaff = function(name,id,tid) {
  staff.title = name
  staff.id = id
  getPointList(tid)
}

/* 时间段 */
const startTime = ref('')
const endTime = ref('')
const timeDisabled = ref(true)
const changeStartTime = function() {
  getTracebydate()
}
const changeEndTime = function() {
  getTracebydate()
}
</script>