<script setup>
import Header from '@/components/guest/header/index.vue'
import Breadcrumb from '@/components/guest/breadcrumb/Index.vue'
</script>

<template>
  <Header />
  <h1 class="text-center text-2xl mt-10">Coremagz</h1>

  <div class="w-fit mx-auto">
    <!-- breadcrumb -->
    <Breadcrumb />
    <!-- grid view -->
    <div class="mt-32 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-[37px] mb-20">
      <!-- dont forget to use v-for -->
      <a
        href="https://online.fliphtml5.com/ljlud/cgjj/index.html"
        class="w-[363.45px] hover:shadow-xl transition duration-100 ease-in-out"
      >
        <img src="../../../assets/image/COREMAGZ-COVER.jpg" class="w-full h-auto" alt="" />
        <p class="font-bold text-center mt-3">Coremagz Edisi Januari-Juli 2023</p>
      </a>
    </div>
  </div>
</template>
