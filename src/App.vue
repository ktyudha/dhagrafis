<script setup>
import { RouterView } from 'vue-router'
import { onBeforeMount, watch } from 'vue'
import { useThemeStore, THEME_MODE_KEY } from '@/stores/theme'
import { updateGlobalOptions } from 'vue3-toastify'

const themeStore = useThemeStore()

watch(
  () => themeStore.mode,
  () => {
    updateGlobalOptions({
      theme: themeStore.mode
    })
  }
)

onBeforeMount(() => {
  themeStore.setThemeMode(localStorage.getItem(THEME_MODE_KEY) ?? 'system')
})
</script>

<template>
  <RouterView />
</template>
