<template>
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
      <el-input v-model="form.mobile" maxlength="11" placeholder="请输入员工电话号码" />
    </el-form-item>
    <el-form-item>
      <button class="w-32 h-9 bg-primary text-white rounded hover:opacity-80" @click="submitForm(formRef)">确定</button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '../../../api'
import { ElMessage } from 'element-plus'

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
        }
        if(res.data.code === 20001) {
          form.realName = form.mobile = ''
          ElMessage({type: 'warning', message: res.data.msg})
        }
      })
    }
  })
}
</script>