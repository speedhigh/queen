<template>
  <div class="w-full h-full flex items-center text-gray-500">
    <!-- 退出登录 -->
    <div class="ml-auto cursor-pointer" @click="quit">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
// 退出登录
const quit = function() {
  ElMessageBox.confirm('你确定要退出登录吗?','提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    sessionStorage.removeItem('token')
    router.replace('/login')
    ElMessage({type: 'success', message: '已成功退出登录'})
  }).catch()
}
</script>