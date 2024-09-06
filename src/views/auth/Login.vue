<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'yup'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const isLoading = ref(false)
const formData = ref({
  email: 'superadmin@media.pens.ac.id',
  password: 'password'
})

const authStore = useAuthStore()
const router = useRouter()

const formSchema = object().shape({
  email: string().email('Email tidak valid').required('Masukkan email'),
  password: string()
    .min(8, 'Password minimal terdiri dari 8 karakter')
    .required('Masukkan password')
})

const login = async (values, actions) => {
  isLoading.value = true
  authStore.purgeAuth()
  await authStore.login(formData.value)

  if (!authStore.error) {
    return router.push({ name: 'dashboard' })
  }

  actions.setFieldError('email', authStore.error)

  isLoading.value = false
}
</script>

<template>
  <div class="card shadow bg-base-100">
    <div class="py-12 px-10">
      <!-- <h1 class="text-xl font-semibold mb-2 text-center">Welcome Back!</h1>
      <div class="mt-6 mx-auto w-24 border-b-2 border-midnight-blue-950"></div> -->
      <Form class="mb-4" :validation-schema="formSchema" @submit="login">
        <div class="form-control w-full mt-6">
          <label class="label" for="email">
            <span class="label-text text-base-content">Email</span>
          </label>
          <Field
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            class="input input-bordered w-full"
            required
            v-model="formData.email"
          />
          <ErrorMessage name="email" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>

        <div class="form-control w-full mt-6">
          <label class="label" for="password">
            <span class="label-text text-base-content">Password</span>
          </label>
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class="input input-bordered w-full"
            v-model="formData.password"
          />
          <ErrorMessage name="password" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>

        <button
          :disabled="isLoading"
          type="submit"
          class="btn mt-10 w-full btn-primary"
          :class="{ 'cursor-wait': isLoading }"
        >
          <span v-if="isLoading" class="loading loading-dots loading-md"></span>
          <span v-else>Login</span>
        </button>

        <div class="text-center mt-4">
          Don't have an account yet?
          <RouterLink
            to="/register"
            class="link link-hover text-midnight-blue-950 dark:text-midnight-blue-800"
          >
            Register
          </RouterLink>
        </div>
      </Form>
    </div>
  </div>
</template>
