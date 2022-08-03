<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-8">
      <div class="flex items-center">
        <p class="text-sm flex-shrink-0">员工姓名：</p>
        <div class="w-40">
          <el-input v-model="params.username" placeholder="请输入员工姓名" clearable />
        </div>
      </div>
      <div class="flex items-center">
        <p class="text-sm flex-shrink-0">手机号：</p>
        <div class="w-56">
          <el-input v-model="params.mobile" placeholder="请输入手机号" clearable />
        </div>
      </div>
      <!-- 添加员工 -->
      <button 
        class="group text-sm w-32 h-8 bg-red-500 text-white relative rounded hover:bg-red-600 active:bg-red-500"
        @click="dialogFormVisible = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-2 text-red-400 group-hover:text-red-200" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
        <span>新增员工</span>
      </button>
    </div>
    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="10"
      url="/salesmanager/getEmployeeList"
    >
      <template #default="slotProps">
        <el-table :data="slotProps.list" :border="true" stripe style="width: 100%">
          <el-table-column prop="id" label="员工ID" min-width="100" />
          <el-table-column prop="name" label="员工姓名" min-width="130" />
          <el-table-column prop="mobile" label="手机号" min-width="130" />
          <el-table-column prop="inserttime" label="注册时间" min-width="130" />
          <el-table-column prop="orderNum" label="成交总量" min-width="130" />
          <el-table-column prop="orderPrice" label="成交总额" min-width="130" />
          <el-table-column prop="customerNum" label="客户数量" min-width="130" />
          <el-table-column label="操作">
            <template #default="scope">
              <p class="text-primary cursor-pointer hover:font-bold hover:underline" @click="removeStaff(scope.row)">删除员工</p>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-pagination>
  </div>
  <!-- 添加员工 -->
  <el-dialog v-model="dialogFormVisible" title="新增员工">
    <el-form
      ref="formRef"
      :model="form"
      status-icon
      :rules="rules"
      label-width="120px"
      class="w-1/2"
    >
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="form.realName" placeholder="请输入员工真实姓名" />
      </el-form-item>
      <el-form-item label="电话号码" prop="mobile">
        <el-input v-model="form.mobile" maxlength="11" placeholder="请输入员工电话号码"  />
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
import { ElMessage, ElMessageBox } from 'element-plus'
import BasePagination from '/src/components/BasePagination.vue'
import api from '/src/api/index.js'

const params = ref({
  username: '',
  mobile: ''
})
const paginationRef = ref()

// 添加员工
const dialogFormVisible = ref(false)
const formRef = ref()
const form = reactive({
  realName: '',
  mobile: ''
})
const checkMobile = function(rule, value, callback) {
  if(!/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error("手机号格式不正确"))
  } else {
    callback()
  }
}
const rules = reactive({
  realName: [{required: true, message: '请输入员工真实姓名', trigger: 'blur'}],
  mobile: [
    { required: true, message: '请输入员工电话号码', trigger: 'blur' },
    { validator: checkMobile, min: 11, max: 11, message: "手机号格式错误", trigger: "blur" }
  ]
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      api.post('/salesmanager/addEmployee', form).then((res) => {
        if(res.data.code === 20000) {
          form.realName = form.mobile = ''
          ElMessage({type: 'success', message: '成功'})
          paginationRef.value.askApi(false)
          dialogFormVisible.value = false
        }
        if(res.data.code === 20001) {
          form.realName = form.mobile = ''
          ElMessage({type: 'warning', message: res.data.msg})
        }
      })
    }
  })
}

// 删除员工
const removeStaff = function(e) {
  ElMessageBox.confirm('你确定要删除该员工吗?','提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    api.delete('/salesmanager/deleteEmployee', {userid: e.id}).then((res) => {
      if(res.data.code === 20000) {
        ElMessage({type: 'success', message: '删除成功'})
        paginationRef.value.askApi(false)
      }
    })
  }).catch()
}
</script>