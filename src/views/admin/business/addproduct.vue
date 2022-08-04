<template>
  <div class="flex">
    <button 
      class="w-10 h-10 bg-red-400 text-white rounded-full hover:bg-red-500"
      @click="$router.back"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <el-form
      ref="formRef"
      :model="form"
      status-icon
      :rules="rules"
      label-width="120px"
      class="w-full"
    >
      <!-- 商品名称 -->
      <el-form-item label="商品名称" prop="name" class="w-1/2">
        <el-input v-model="form.name" placeholder="请输入商品名称" />
      </el-form-item>
      <!-- 商品类别 -->
      <el-form-item label="商品类别" prop="clazz" class="w-1/2">
        <el-input v-model="form.clazz" placeholder="请输入商品类别" />
      </el-form-item>
      <!-- sku码 -->
      <el-form-item label="sku码" prop="skunum" class="w-1/2">
        <el-input v-model="form.skunum" placeholder="请输入sku码" />
      </el-form-item>
      <!-- 木子网手机端id -->
      <el-form-item label="木子网手机端id" prop="muzimobileproid" class="w-1/2">
        <el-input v-model="form.muzimobileproid" placeholder="请输入木子网手机端id" />
      </el-form-item>
      <!-- 缩略图 -->
      <el-form-item label="缩略图地址" prop="thumbnail" class="w-1/2">
        <el-input v-model="form.thumbnail" placeholder="请输入缩略图地址" />
      </el-form-item>
      <!-- 价格 -->
      <el-form-item label="价格" prop="price" class="w-1/2">
        <el-input v-model="form.price" placeholder="请输入商品价格" />
      </el-form-item>
      <!-- 购买链接 -->
      <el-form-item label="购买链接" prop="buyhref" class="w-1/2">
        <el-input v-model="form.buyhref" placeholder="请输入购买链接" />
      </el-form-item>
      <!-- 药店名字 -->
      <el-form-item label="药店名字" prop="storename" class="w-1/2">
        <el-input v-model="form.storename" placeholder="请输入药店名字" />
      </el-form-item>
      <!-- 国家 -->
      <el-form-item label="国家" prop="countryname" class="w-1/2">
        <el-input v-model="form.countryname" placeholder="请输入国家" />
      </el-form-item>
      <!-- 已售数量 -->
      <el-form-item label="已售数量" prop="salenum" class="w-1/2">
        <el-input v-model="form.salenum" placeholder="请输入已售数量" />
      </el-form-item>
      <!-- 重量 -->
      <el-form-item label="重量" prop="weight" class="w-1/2">
        <el-input v-model="form.weight" placeholder="请输入商品重量" />
      </el-form-item>
      <!-- 注意事项 -->
      <el-form-item label="注意事项" prop="zhuyi" class="w-1/2">
        <el-input v-model="form.zhuyi" placeholder="请输入注意事项" />
      </el-form-item>
      <!-- 保存方法 -->
      <el-form-item label="保存方法" prop="baocun" class="w-1/2">
        <el-input v-model="form.baocun" placeholder="请输入保存方法" />
      </el-form-item>
      <!-- 详情 -->
      <el-form-item label="详情" prop="content" class="w-1/2">
        <el-input v-model="form.content" placeholder="请输入详情图片地址" />
        <!-- <div class="border">
          <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            class="border-b"
          />
          <Editor
            v-model="form.content"
            :defaultConfig="editorConfig"
            @onCreated="handleCreated"
          />
        </div> -->
      </el-form-item>
      <el-form-item>
        <button
          class="mt-10 w-32 h-9 bg-primary text-white rounded-md hover:opacity-80" 
          @click="submitForm(formRef)"
        >
          确定
        </button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from '/src/api/index.js'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css'

const router = useRouter()
const formRef = ref()
const form = reactive({
  name: '',
  clazz: '',
  skunum: '',
  muzimobileproid: '',
  thumbnail: '',
  price: '',
  buyhref: '',
  countryname: '',
  salenum: '',
  weight: '',
  zhuyi: '',
  baocun: '',
  content: ''
})
const rules = reactive({
  name: [{required: true, message: '请输入商品名称', trigger: 'blur'}],
  clazz: [{required: true, message: '请输入商品类别', trigger: 'blur'}],
  skunum: [{required: true, message: '请输入sku码', trigger: 'blur'}],
  muzimobileproid: [{required: true, message: '请输入木子网手机端id', trigger: 'blur'}],
  thumbnail: [{required: true, message: '请输入缩略图地址', trigger: 'blur'}],
  price: [{required: true, message: '请输入商品价格', trigger: 'blur'}],
  buyhref: [{required: true, message: '请输入购买链接', trigger: 'blur'}],
  storename: [{required: true, message: '请输入药店名字', trigger: 'blur'}],
  countryname: [{required: true, message: '请输入国家', trigger: 'blur'}],
  salenum: [{required: true, message: '请输入已售数量', trigger: 'blur'}],
  weight: [{required: true, message: '请输入商品重量', trigger: 'blur'}],
  zhuyi: [{required: true, message: '请输入注意事项', trigger: 'blur'}],
  baocun: [{required: true, message: '请输入保存方法', trigger: 'blur'}],
  content: [{required: true, message: '请编辑详情信息', trigger: 'blur'}],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      api.post('/product/addProduct', form).then((res) => {
        if(res.data.code === 20000) {
          ElMessage({type: 'success', message: '添加成功'})
          router.replace('/admin/business')
        }
      })
    }
  })
}
</script>