import ApiService from '@/services/ApiService'
import TokenService from '@/services/TokenService'
import axios from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const error = ref('')
  const errors = ref({})
  const user = ref({})
  const isAuthenticated = ref(!!TokenService.getToken())

  function setAuth(authUser, token = '') {
    isAuthenticated.value = true
    user.value = authUser
    error.value = ''
    errors.value = {}
    if (token) {
      TokenService.saveToken(token)
    }
  }

  function setError(data) {
    error.value = data.message ?? ''
    errors.value = data.errors ?? {}
  }

  function purgeAuth() {
    isAuthenticated.value = false
    user.value = {}
    error.value = ''
    errors.value = {}
    TokenService.destroyToken()
  }

  async function login(credentials) {
    return await axios
      .post('auth/login', credentials)
      .then(({ data }) => {
        setAuth(data.user, data.token)
      })
      .catch(({ response }) => {
        setError(response.data)
      })
  }

  async function logout() {
    if (TokenService.getToken()) {
      await ApiService({ requiresAuth: true }).post('auth/logout')
      purgeAuth()
    } else {
      purgeAuth()
    }
  }

  async function register(credentials) {
    return ApiService()
      .post('auth/register', credentials)
      .catch(({ data }) => {
        setError(data)
      })
  }

  async function verifyAuth() {
    if (TokenService.getToken()) {
      await ApiService({ requiresAuth: true })
        .get('auth/me')
        .then(({ data }) => {
          setAuth(data.user)
        })
        .catch(({ data }) => {
          setError(data)
          purgeAuth()
        })
    } else {
      purgeAuth()
    }
  }

  return {
    error,
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    purgeAuth,
    verifyAuth
  }
})
