import { defineStore } from 'pinia'
import { ref } from 'vue'

export const THEME_MODE_KEY = 'theme_mode'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref(localStorage.getItem(THEME_MODE_KEY) ?? 'system')

  function getSystemMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  function setThemeMode(payload) {
    const currentMode = payload === 'system' ? getSystemMode() : payload

    localStorage.setItem(THEME_MODE_KEY, currentMode)
    mode.value = currentMode

    document.documentElement.setAttribute('data-theme', currentMode)
  }

  return {
    mode,
    getSystemMode,
    setThemeMode
  }
})
