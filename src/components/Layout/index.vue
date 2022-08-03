<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="220px">
        <layout-aside />
      </el-aside>
      <el-container>
        <!-- 头部栏 -->
        <el-header class="shadow-md">
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