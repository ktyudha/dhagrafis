import './index.css'
import '../node_modules/nprogress/nprogress.css'
import 'vue3-toastify/dist/index.css'
import 'flowbite'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Vue3Toastify from 'vue3-toastify'
import { queryClient } from '@/plugins/vue-query'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { initVeeValidate } from '@/plugins/vee-validate'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueQueryPlugin, {
  queryClient
})
app.use(Vue3Toastify, {
  newestOnTop: true
})

initVeeValidate()

app.mount('#app')
