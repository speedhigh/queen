<template>
  <div id="container" class="p-0 m-0 w-full h-[830px]" />
</template>

<script setup>
import { watch } from 'vue'
import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader'

const props = defineProps({
  path: {
    type: Array,
    default: []
  },
  stay: {
    type: Array,
    default: []
  }
})

const map = shallowRef(null)
const polyline = shallowRef(null)
const textList = shallowRef([])

const initMap = function () {
  AMapLoader.load({
    key: "5bdf30c2930ae2465c47fc0881022743",              // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0",                                       // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''],                                        // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {

    map.value = new AMap.Map("container", {
      resizeEnable: true,
      zoom: 15,
      center: props.path.length > 0 ? [props.path[0][0], props.path[0][1]] : '',
    })

    if(props.stay.length > 0) {
      props.stay.forEach((item, index) => {
        textList.value[index] = new AMap.Text({
          text: '停留'+item.time+'分钟',
          anchor:'center', // 设置文本标记锚点
          draggable:true,
          cursor:'pointer',
          style:{
            'background-color': '#F13130',
            'color': 'white',
            'font-size': '12px',
            'border-radius': '0.3rem'
          },
          // offset: new AMap.Pixel(40, -10),
          position: [item.x, item.y],
        })
      })
    }

    // 绘制轨迹
    if(props.path.length > 0) {
      polyline.value = new AMap.Polyline({
        map: map.value,
        path: props.path,
        strokeColor: "#FF432A",
        lineJoin: 'round',
        lineCap: 'round',
        strokeWeight: 5,
        strokeOpacity:0.7,
        showDir: true
      })
    }

    map.value.add([polyline.value])
    map.value.add(textList.value)
    map.value.setFitView()
  }).catch(e => {
    console.log(e)
  })
}
initMap()
watch(() => [...props.path], (value) => {
  initMap()
})
watch(() => [...props.stay], (value) => {
  initMap()
})
</script>