<script setup>
import ApiService from '@/services/ApiService'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const isLoading = ref(false)
const message = ref(null)
const error = ref(null)
const route = useRoute()

const send = async () => {
  isLoading.value = true
  await ApiService()
    .post(`auth/email/verification-notification/${route.params.id}`)
    .then((response) => {
      message.value = response.data.message
    })
    .catch((response) => {
      error.value = response.data.message
    })

  isLoading.value = false
}
</script>

<template>
  <div class="card shadow bg-base-100">
    <div class="py-12 px-10">
      <h1 class="text-xl font-semibold mb-2">Verify your acccount</h1>
      <p>Account activation link has been sent to the email address you provided</p>

      <div class="space-y-4 md:space-y-6">
        <div
          v-if="!isLoading && !error"
          class="my-4 font-medium text-sm text-green-600 dark:text-green-400"
        >
          {{ message }}
        </div>
        <div v-else class="my-4 font-medium text-sm text-red-600 dark:text-red-400">
          {{ error }}
        </div>

        <p class="text-sm text-center inline-flex align-middle gap-1">
          Didn't get the email?
          <a
            v-if="!isLoading"
            @click="send"
            class="link link-hover text-midnight-blue-950 dark:text-midnight-blue-800"
          >
            Send it again
          </a>
          <span
            v-else
            class="loading loading-dots loading-sm text-midnight-blue-950 dark:text-midnight-blue-800"
          ></span>
        </p>
      </div>
    </div>
  </div>
</template>
