<template>
  <div class="common-layout">
    <el-container class="pl-[220px]">
      <!-- 侧边栏 -->
      <el-aside width="220px" class="bg-[#03776A] fixed left-0 z-50">
        <layout-aside />
      </el-aside>
      <el-container class="relative pt-[60px]">
        <!-- 头部栏 -->
        <el-header class="shadow-md fixed top-0 inset-x-0 bg-white z-40">
          <layout-header />
        </el-header>
        <!-- 内容部分 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import LayoutAside from './LayoutAside.vue'
import LayoutHeader from './LayoutHeader.vue'
</script>