<template>
  <div class="relative">
    <map-container :path="path" :stay="stay" />
    <div class="absolute flex items-center z-20 top-8 left-8 space-x-8">
      <button 
        class="w-40 h-10 text-sm bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded relative"
        @click="$router.back()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
        </svg>
        返回近期数据
      </button>
      <!-- 选择时间段 -->
      <div class="space-x-4">
        <!-- <el-time-select
          v-model="startTime"
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
        /> -->
      </div>
    </div>
    <div class="absolute bottom-8 left-8">
      <div class="h-[40px] bg-white px-4 shadow-md rounded text-sm text-gray-600 flex items-center space-x-8 cursor-default">
        <p>{{ $route.query.d }} {{ $route.query.n }} 的运动轨迹</p>
        <!-- <p>全程 {{ distance }}km</p>
        <p>用时 {{ time }}</p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '/src/api/index.js'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { pickBy } from 'lodash'
import formatSeconds from '/src/until/formatSeconds.js'
import MapContainer from '/src/components/MapContainer.vue'

const route = useRoute()
const path = ref([])
const stay = ref([])
const time = ref('')
const distance = ref(0)

const getMapData = function(mapData) {
  for(let index = 0; index < mapData.length; index++) {
    let item = mapData[index]
    // let i = item.location.indexOf(',')
    path.value[index] = [item.longitude, item.latitude]
    console.log('cccccccc', item.longitude, item.latitude)
  }

  // 路线信息
  // if(mapData.points) {
  //   for(let index = 0; index < mapData.points.length; index++) {
  //     let item = mapData.points[index]
  //     let i = item.location.indexOf(',')
  //     path.value[index] = [item.location.slice(0,i), item.location.slice(i + 1)]
  //   }
  // }
  // 停留信息
  // if(mapData.stayPoints) {
  //   for(let index = 0; index < mapData.stayPoints.length; index++) {
  //     let item = mapData.stayPoints[index]
  //     let i = item.location.indexOf(',')
  //     stay.value[index] = {
  //       x: item.location.slice(0, i),
  //       y: item.location.slice(i + 1),
  //       address: item.address,
  //       time: Math.round([item.endTime - item.startTime]/60000)
  //     }
  //   }
  // }
}

// 根据 时间段 获取当日的 路线信息 和 停留信息
const getTracebydate = function() {
  let params = {
    date: route.query.d,
    userId: route.params.id
    // start: startTime.value ? route.query.d + ' ' + startTime.value : '',
    // end: endTime.value ? route.query.d + ' ' + endTime.value : '',
    // uid: route.params.id
  }
  api.get('/position/getUserPositionDetail', pickBy(params)).then((res) => {
    if(res.data.code === 20000 && res.data.data.length > 0) {
      console.log(res.data.data)
      getMapData(res.data.data)
      // time.value = formatSeconds(res.data.data.time)
      // distance.value = res.data.data.distance/1000
    } else {
      // stay.value = path.value = []
      ElMessage({type: 'warning', message: '该时间范围内没有轨迹'})
    }
  })
}

/* 时间段 */
const startTime = ref('')
const endTime = ref('')
const changeStartTime = function() {
  getTracebydate()
}
const changeEndTime = function() {
  getTracebydate()
}

getTracebydate()
</script>