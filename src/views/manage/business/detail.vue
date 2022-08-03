<template>
  <div class="space-y-4">
    <button 
      class="w-40 h-10 text-sm bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded relative"
      @click="$router.back()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
      </svg>
      返回业务列表
    </button>
    <table class="table-auto">
      <tbody>
        <!-- 销售 -->
        <tr>
          <td class="td-title">销售</td>
          <td class="td-text">{{ data.salesName }}</td>
        </tr>
        <!-- 客户 -->
        <tr>
          <td class="td-title">客户</td>
          <td class="td-text">{{ data.consumersName }}</td>
        </tr>
        <!-- 订单返佣 -->
        <tr>
          <td class="td-title">订单返佣</td>
          <td class="td-text">{{ data.rebates }}</td>
        </tr>
        <!-- 收货人 -->
        <tr>
          <td class="td-title">收货人</td>
          <td class="td-text">{{ data.addressInfoVo.name }}</td>
        </tr>
        <!-- 手机号 -->
        <tr>
          <td class="td-title">手机号</td>
          <td class="td-text">{{ data.addressInfoVo.mobile }}</td>
        </tr>
        <!-- 等级 -->
        <tr>
          <td class="td-title">等级</td>
          <td class="td-text">{{ data.level }}</td>
        </tr>
        <!-- 收货信息 -->
        <tr>
          <td class="td-title">收货信息</td>
          <td class="py-2 px-4 text-sm leading-6 border">
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">地址id：</p>
              <p class="text-gray-600">{{ data.addressInfoVo.id }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">收货地址：</p>
              <p class="text-gray-600">{{ data.addressInfoVo.address }} <span>{{ data.addressInfoVo.detail }}</span></p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">收货人：</p>
              <p class="text-gray-600">{{ data.addressInfoVo.name }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">收货人手机号：</p>
              <p class="text-gray-600">{{ data.addressInfoVo.mobile }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">收货人身份证号：</p>
              <p class="text-gray-600">{{ data.addressInfoVo.cardnum }}</p>
            </div>
          </td>
        </tr>
        <!-- 实名认证 -->
        <tr>
          <td class="td-title">实名认证</td>
          <td class="py-2 px-4 text-sm leading-6 border">
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">实名名字：</p>
              <p class="text-gray-600">{{ data.addressInfoVo.name }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">实名身份证号：</p>
              <p class="text-gray-600">{{ data.addressInfoVo.cardnum }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">实名手机号：</p>
              <p class="text-gray-600">{{ data.addressInfoVo.mobile }}</p>
            </div>
          </td>
        </tr>
        <!-- 订单信息 -->
        <tr>
          <td class="td-title">订单信息</td>
          <td class="py-2 px-4 text-sm leading-6 border">
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">订单id：</p>
              <p class="text-gray-600">{{ data.id }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">地址id：</p>
              <p class="text-gray-600">{{ data.addressInfoVo.id }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">付款金额：</p>
              <p class="text-gray-600">{{ data.orderprice }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">订单状态：</p>
              <p class="text-gray-600">{{ data.status }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">订单商品：</p>
              <p class="text-gray-600">{{ data.product }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">订单生成时间：</p>
              <p class="text-gray-600">{{ data.createTime }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">付款时间：</p>
              <p class="text-gray-600">{{ data.payTime }}</p>
            </div>
            <div class="flex">
              <p class="font-bold w-32 flex-shrink-0">快递详情：</p>
              <p class="text-gray-600">{{ data.logistic.message }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
/*这个页面蠢爆了，后台怎么了，后台不是人用的吗 */
import { ref } from 'vue'
import api from '/src/api/index.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const data = ref({
  addressInfoVo: {},
  logistic: {}
})
api.get('/business/orderInfo', { orderid: route.params.id }).then((res) => {
  if(res.data.code === 20000) Object.assign(data.value, res.data.data)
})
</script>

<style>
.td-title {
  @apply w-32 font-bold border px-4 py-2
}
.td-text {
  @apply border px-4 w-[600px] text-gray-600 py-2 text-sm
}
</style>