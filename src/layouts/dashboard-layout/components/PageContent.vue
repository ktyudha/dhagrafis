<script setup>
import Header from './Header.vue'
</script>

<template>
  <div class="drawer-content flex flex-col h-screen">
    <Header />
    <main class="flex-1 overflow-y-auto px-4 py-8 md:p-12 bg-base-200">
      <RouterView />
    </main>
  </div>
</template>
