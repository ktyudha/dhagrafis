<script setup>
import ApiService from '@/services/ApiService'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'

const isLoading = ref(true)
const message = ref(null)
const error = ref(null)
const route = useRoute()

onBeforeMount(async () => {
  await ApiService()
    .post(`auth/verify-email/${route.params.id}/${route.params.hash}`, undefined, {
      params: route.query
    })
    .then((response) => {
      message.value = response.data.message
    })
    .catch((response) => {
      error.value = response.data.message
    })
})
</script>

<template>
  <div class="card shadow bg-base-100">
    <div class="py-12 px-10">
      <div class="text-center">
        <FontAwesomeIcon
          :icon="faSpinner"
          spinPulse
          size="3x"
          v-if="isLoading"
          class="mx-auto mb-8"
        />
        <FontAwesomeIcon
          :icon="faCircleCheck"
          size="3x"
          v-else-if="!isLoading && !error"
          class="text-success mx-auto mb-8"
        />
        <FontAwesomeIcon :icon="faCircleXmark" size="3x" v-else class="text-error mx-auto mb-8" />

        <h1 v-if="isLoading" class="text-xl font-semibold mb-2">Verifying email ...</h1>
        <h1 v-else-if="!isLoading && !error" class="text-xl text-success font-semibold mb-2">
          {{ message }}
        </h1>
        <h1 v-else class="text-xl text-error font-semibold mb-2">
          {{ error }}
        </h1>
      </div>
    </div>
  </div>
</template>
