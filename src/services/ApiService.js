import router from '@/router'
import TokenService from '@/services/TokenService'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

export default ({ requiresAuth = false } = {}) => {
  const options = {}
  options.baseURL = import.meta.env.VITE_APP_API_URL ?? 'http://127.0.0.1:8000/api'
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  const authStore = useAuthStore()

  if (requiresAuth) {
    options.headers.Authorization = `Bearer ${TokenService.getToken()}`
  }

  const instance = axios.create(options)

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status) {
        switch (error.response.status) {
          // case 400:
          //   console.error('Developer dump')
          //   break

          case 401:
            authStore.purgeAuth()
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
            break

          // case 403:
          //   router.back()
          //   break

          // case 404:
          //   router.replace({
          //     path: '/404',
          //     query: {
          //       redirect: router.currentRoute.fullPath
          //     }
          //   })
          //   break
        }

        return Promise.reject(error.response)
      }
    }
  )

  return instance
}
