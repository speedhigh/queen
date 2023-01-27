<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-6">
      <!-- 姓名 -->
      <div class="flex items-center">
        <p class="text-sm flex-shrink-0">姓名：</p>
        <div class="w-36">
          <el-input v-model="params.name" placeholder="请输入姓名" clearable />
        </div>
      </div>
      <!-- 手机号 -->
      <div class="flex items-center">
        <p class="text-sm flex-shrink-0">手机号：</p>
        <div class="w-40">
          <el-input v-model="params.mobile" placeholder="请输入手机号" clearable />
        </div>
      </div>
      <!-- 身份 -->
      <div class="flex items-center">
        <p class="text-sm">选择身份：</p>
        <el-select v-model="params.roleid" clearable placeholder="请选择身份">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="flex space-x-4">
        <!-- 添加账号 -->
        <button 
          class="w-24 h-8 text-sm text-primary border border-primary rounded hover:bg-primary hover:text-white"
          @click="dialogFormVisible = true"
        >
          + 添加账号
        </button>
        <!-- 导出数据 -->
        <!-- <button 
          class="text-sm text-white bg-teal-500 rounded w-24 h-8 relative hover:bg-teal-600"
          @click="exportExcel"  
        >
          导出excel
        </button> -->
      </div>
    </div>
    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="10"
      url="/adminmanager/getAdminUserList"
    >
      <template #default="slotProps">
        <el-table :data="slotProps.list" :border="true" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" min-width="30" />
          <el-table-column prop="name" label="姓名" min-width="50" />
          <el-table-column prop="mobile" label="手机号" min-width="80" />
          <el-table-column prop="insertTime" label="注册时间" min-width="100" />
          <el-table-column prop="role" label="身份" min-width="70" />
          <el-table-column label="操作" min-width="70" >
            <template #default="scope">
              <div class="flex items-center space-x-6">
                <!-- 切换身份 -->
                <el-dropdown trigger="click">
                  <el-button type="danger">
                    修改身份 <el-icon class="ml-2"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item 
                        v-for="item in roleList" 
                        :key="item.id"
                        @click="changeRole(scope.row, item)"
                      >
                        {{ item.name }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <!-- 删除 -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" @click="deleteAccount(scope.row)" />
                </svg>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-pagination>
  </div>
  <!-- 添加账号 -->
  <el-dialog v-model="dialogFormVisible" title="添加账号">
    <el-form
      ref="formRef"
      :model="form"
      status-icon
      :rules="rules"
      label-width="120px"
      class="w-1/2"
    >
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="form.realName" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item label="电话号码" prop="mobile">
        <el-input v-model="form.mobile" maxlength="11" placeholder="请输入电话号码" />
      </el-form-item>
      <el-form-item label="选择身份" prop="roleid">
        <el-select v-model="form.roleid" clearable placeholder="请选择身份">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <button
          class="w-32 h-9 bg-primary text-white rounded-md hover:opacity-80" 
          @click="submitForm(formRef)"
        >
          确定
        </button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from '/src/api/index.js'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BasePagination from '/src/components/BasePagination.vue'

const router = useRouter()
const paginationRef = ref()

const params = ref({
  mobile: '',
  name: '',
  roleid: ''
})

// 获取身份列表
const roleList = ref([])
api.get('/adminmanager/getAdminRoleList').then((res) => {
  roleList.value = res.data.data
})

// 添加账号
const dialogFormVisible = ref(false)
const formRef = ref()
const form = reactive({
  realName: '',
  mobile: '',
  roleid: ''
})
const checkMobile = function(rule, value, callback) {
  if(!/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error("手机号格式不正确"))
  } else {
    callback()
  }
}
const rules = reactive({
  realName: [{required: true, message: '请输入真实姓名', trigger: 'blur'}],
  mobile: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { validator: checkMobile, min: 11, max: 11, message: "手机号格式错误", trigger: "blur" }
  ],
  roleid: [{required: true, message: '请选择身份', trigger: 'change'}],
})
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      api.post('/adminmanager/addUser', form).then((res) => {
        if(res.data.code === 20000) {
          form.realName = form.mobile = ''
          ElMessage({type: 'success', message: '成功'})
          paginationRef.value.askApi(false)
          dialogFormVisible.value = false
        }
        if(res.data.code === 20001) {
          form.realName = form.mobile =  ''
          ElMessage({type: 'warning', message: res.data.msg})
        }
      })
    }
  })
}

// 修改身份
const changeRole = function(row, role) {
  ElMessageBox.confirm(`确定要将 ${row.name} 的身份修改为 ${role.name} 吗？`,'提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    api.get('/adminmanager/updateRole', {uid: row.id, roleid: role.id}).then((res) => {
      if(res.data.code === 20000) {
        row.role = role.name
        ElMessage({type: 'success', message: '修改成功！'})
      } else {
        ElMessage({type: 'error', message: '修改失败'})
      }
    })
  }).catch()
}

// 删除账号
const deleteAccount = function(row) {
  ElMessageBox.confirm(`确定要将 ${row.name} 的账号删除吗？`,'提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    api.delete('/adminmanager/deleteUser', {userid: row.id}).then((res) => {
      if(res.data.code === 20000) {
        paginationRef.value.askApi(false)
        ElMessage({type: 'success', message: '已成功删除！'})
      } else {
        ElMessage({type: 'error', message: '删除失败'})
      }
    })
  }).catch()
}
</script>