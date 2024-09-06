<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const isLoading = ref(false)
const formData = ref({})

const authStore = useAuthStore()
const router = useRouter()

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min('3', 'Minimal 3 karakter')
    .max(255, 'Maksimal 255 karakter')
    .required('Masukkan nama'),
  email: yup.string().email('Email tidak valid').required('Masukkan email'),
  password: yup
    .string()
    .min(8, 'Password minimal terdiri dari 8 karakter')
    .required('Masukkan password'),
  confirmation_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password konfirmasi tidak sama')
    .required('Masukkan konfirmasi password')
})

const register = async (values, actions) => {
  isLoading.value = true
  authStore.purgeAuth()
  const response = await authStore.register(formData.value)

  if (!authStore.error) {
    router.push({ name: 'verification.notice', params: { id: response.data.user.id } })
  }

  actions.setErrors(authStore.errors)

  isLoading.value = false
}
</script>

<template>
  <div class="card shadow bg-base-100">
    <div class="py-12 px-10">
      <h1 class="text-xl font-semibold mb-2 text-center">Create Your Account</h1>
      <div class="mt-6 mx-auto w-24 border-b-2 border-midnight-blue-950"></div>
      <Form class="mt-10 mb-4" :validation-schema="formSchema" @submit="register">
        <div class="form-control w-full mt-6">
          <label class="label" for="name">
            <span class="label-text text-base-content">Your Name</span>
          </label>
          <Field
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            class="input input-bordered w-full"
            required
            v-model="formData.name"
          />
          <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>

        <div class="form-control w-full mt-6">
          <label class="label" id="email">
            <span class="label-text text-base-content">Your Email</span>
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

        <div class="form-control w-full mt-6">
          <label class="label" for="confirmation_password">
            <span class="label-text text-base-content">Confirmation Password</span>
          </label>
          <Field
            type="password"
            name="confirmation_password"
            id="confirmation_password"
            placeholder="Confirmation Password"
            class="input input-bordered w-full"
          />
          <ErrorMessage
            name="confirmation_password"
            class="mt-2 text-sm text-red-600 dark:text-red-400"
          />
        </div>

        <button
          :disabled="isLoading"
          type="submit"
          class="btn mt-10 w-full btn-primary"
          :class="{ 'cursor-wait': isLoading }"
        >
          <span v-if="isLoading" class="loading loading-dots loading-md"></span>
          <span v-else>Create an account</span>
        </button>

        <div class="text-center mt-4">
          Already have an account?
          <RouterLink
            to="/login"
            class="link link-hover text-midnight-blue-950 dark:text-midnight-blue-800"
          >
            Login
          </RouterLink>
        </div>
      </Form>
    </div>
  </div>
</template>
