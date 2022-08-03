<template>
  <div class="px-4">
    <h2 class="text-4xl mb-32">欢迎你，{{ user.name }}！</h2>
    <Vue3Lottie :animationData="BookJson" :height="500" :width="500" />
  </div>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import BookJson from '/src/assets/book.json'

const user = JSON.parse(sessionStorage.getItem('user')) 
</script>