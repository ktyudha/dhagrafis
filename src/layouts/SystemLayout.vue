<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <section class="bg-white dark:bg-gray-900 flex min-h-screen items-center">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <RouterView />
      </div>
    </div>
  </section>
</template>
