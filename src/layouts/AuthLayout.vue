<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="min-h-screen bg-signup flex items-center">
    <div class="mx-auto w-full max-w-md py-8">
      <h1 class="flex items-center justify-center text-2xl text-center font-semibold mb-8">
        <!-- <img src="/public/media/logo/pens.png" class="w-12 h-12 fill-black mr-2" alt="pens-logo" /> -->
        <img src="https://vindes.id/assets/img/fg_logo.png" alt="" />
      </h1>
      <RouterView />
    </div>
  </div>
</template>
