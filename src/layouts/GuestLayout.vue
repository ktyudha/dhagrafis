<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

import Navbar from '@/components/guest/navbar/Index.vue'
import Footer from '@/components/guest/footer/Index.vue'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <!-- <div class="bg-[url('@/assets/image/pattern.svg')] bg-contain">
    
  </div> -->

  <Navbar />

  <RouterView />

  <Footer />
</template>
