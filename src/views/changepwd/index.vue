<template>
  <form class="space-y-4 text-sm">
    <!-- 旧密码 -->
    <div class="flex items-center space-x-2">
      <p>旧密码：</p>
      <input type="password" class="border border-gray-200 outline-none py-1 px-4 w-96 rounded focus:border-red-500">
    </div>
    <!-- 新密码 -->
    <div class="flex items-center space-x-2">
      <p>新密码：</p>
      <input type="password" class="border border-gray-200 outline-none py-1 px-4 w-96 rounded focus:border-red-500">
    </div>
    <!-- 新密码 -->
    <div class="flex items-center space-x-2">
      <p>新密码：</p>
      <input type="password" class="border border-gray-200 outline-none py-1 px-4 w-96 rounded focus:border-red-500">
    </div>
  </form>
  <button class="ml-16 mt-10 bg-red-500 text-white w-32 h-10 text-sm rounded hover:bg-red-600">确认修改</button>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  oldPwd: '',
  newPwd: '',
  newPwd2: '',
})
</script>