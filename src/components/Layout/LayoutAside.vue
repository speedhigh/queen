<template>
  <el-menu 
    class="h-screen"
    background-color="#374151"
    active-text-color="#fff"
    text-color="#fff"
    :default-active="$route.meta.name"
    :default-openeds="openedsArr"
    router
  >

    <!-- logo -->
    <div class="py-3 px-7">
      <img :src="logoImg" alt="logo" width="110" height="40">
    </div>

    <!-- 首页 -->
    <el-menu-item index="Home" :route="{path: '/home'}" @click="clearAsideIdx">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>

    <!-------------------------------- 动态侧边栏 -------------------------------->
    <template v-for="(item, index) in list" :key="index">
      <!-- 一级菜单 -->
      <el-menu-item v-if="item.list.length === 0" :index="item.name" :route="{path: item.path}" @click="clearAsideIdx">
        <el-icon><Folder /></el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-sub-menu v-if="item.list.length > 0" :index="index + ''">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item 
          v-for="(i, idx) in item.list"
          :key="idx"
          :index="i.name" 
          :route="{path: i.path}"
          @click="changeAsideIdx(index)"
        >
          {{ i.title }}
        </el-menu-item>
      </el-sub-menu>
    </template>

    <!-- 修改密码 -->
    <el-menu-item index="ChangePwd" :route="{path: '/changepwd'}" @click="clearAsideIdx">
      <el-icon><Setting /></el-icon>
      <span>修改密码</span>
    </el-menu-item>

  </el-menu>
</template>

<script setup>
import api from '/src/api/index.js'
import { ref } from 'vue'
import { House, Menu as IconMenu, Folder, Setting } from '@element-plus/icons-vue'
import logoImg from '/src/assets/images/logo.png'

const openedsArr = ref(sessionStorage.getItem('asideIndex') ? [sessionStorage.getItem('asideIndex')] : [])
const list = ref([])
api.get('/admin/navigation').then((res) => {
  if(res.data.code === 20000) list.value = res.data.data
})

const changeAsideIdx = function(index) {
  sessionStorage.setItem('asideIndex', index)
}
const clearAsideIdx = function() {
  openedsArr.value = []
  sessionStorage.removeItem('asideIndex')
}
</script>

<style>
.el-menu-item.is-active {
  background: #F13130 !important;
}
</style>