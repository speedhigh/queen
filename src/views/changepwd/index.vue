<template>
  <form class="space-y-4 text-sm">
    <!-- 旧密码 -->
    <div class="flex items-center space-x-2">
      <p>旧密码：</p>
      <input v-model="form.oldPwd" type="password" class="border border-gray-200 outline-none py-1 px-4 w-96 rounded focus:border-red-500">
    </div>
    <!-- 新密码 -->
    <div class="flex items-center space-x-2">
      <p>新密码：</p>
      <input v-model="form.newPwd" type="password" class="border border-gray-200 outline-none py-1 px-4 w-96 rounded focus:border-red-500">
    </div>
    <!-- 新密码 -->
    <div class="flex items-center space-x-2">
      <p>新密码：</p>
      <input v-model="form.newPwd2" type="password" class="border border-gray-200 outline-none py-1 px-4 w-96 rounded focus:border-red-500">
    </div>
  </form>
  <button 
    class="ml-16 mt-10 bg-red-500 text-white w-32 h-10 text-sm rounded hover:bg-red-600"
    @click="submit"
  >
    确认修改
  </button>
</template>

<script setup>
import { reactive } from 'vue'
import api from '/src/api/index.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  oldPwd: '',
  newPwd: '',
  newPwd2: '',
})

const login = function() {
  api.put('/adminmanager/updatePassWord', {newPwd: form.newPwd, oldPwd: form.oldPwd}).then((res) => {
    if(res.data.code === 20000) {
      sessionStorage.removeItem('token')
      router.replace('/login')
      ElMessage({type: 'success', message: '修改成功'})
    } else {
      ElMessage({type: 'error', message: res.data.msg})
      form.oldPwd = form.newPwd = form.newPwd2 = ''
    }
  })
}

const submit = function() {
  if(!form.oldPwd || !form.newPwd || !form.newPwd2) {
    ElMessage({type: 'warning', message: '请填写完整信息'})
    return
  }
  if(form.newPwd !== form.newPwd2) {
    ElMessage({type: 'warning', message: '两次输入的密码不一致'})
    return
  }
  login()
}
</script>