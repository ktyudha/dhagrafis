<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { onBeforeMount, ref } from 'vue'
import { object, string } from 'yup'
// import FileUpload from '@/components/FileUpload.vue'
import ApiService from '@/services/ApiService'
import Alert from '@/plugins/sweetalert'

const isLoading = ref(false)
const imagePreview = ref(null)
const formData = ref({})

const onLoadFile = (event) => {
  const file = event.target.files[0]
  if (
    file &&
    (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/webp')
  ) {
    imagePreview.value = URL.createObjectURL(file)
    formData.value.image = file // Store the file in formData
  } else {
    imagePreview.value = null
    formData.value.image = null
    console.log('Please upload a PNG, JPEG, or WEBP image.')
  }
}

const formSchema = object().shape({
  title: string().max(255).required('Masukkan judul'),
  description: string().required('Masukkan Description')
})

const store = async (values, actions) => {
  formData.value._method = 'PUT'
  isLoading.value = true

  await ApiService({ requiresAuth: true })
    .post(`admin/promo/info/edit`, formData.value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      Alert.fire({
        text: res.data.message,
        icon: res.data.status
      }).then(() => {})
    })
    .catch((res) => {
      actions.setErrors(res.data.errors)
    })

  isLoading.value = false
}

onBeforeMount(async () => {
  const promo_info = await ApiService({ requiresAuth: true })
    .get('admin/promo/info')
    .then((res) => res.data.promo)

  formData.value = promo_info
  imagePreview.value = promo_info.image ? [promo_info.image] : []

  if (promo_info.additional_info) {
    formData.value.additional_info = JSON.parse(promo_info.additional_info)
  }
})
</script>

<template>
  <h1 class="mb-8 text-3xl font-bold">Promo Info</h1>

  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <Form :validation-schema="formSchema" @submit="store">
        <div class="grid grid-cols-2 gap-7">
          <div class="form-control w-full mb-6">
            <label class="label" for="title">
              <span class="label-text text-base-content">Page Title</span>
            </label>
            <Field
              type="text"
              name="title"
              id="title"
              placeholder="Enter your title"
              class="input input-bordered w-full"
              required
              v-model="formData.title"
            />
            <ErrorMessage name="title" class="mt-2 text-sm text-red-600 dark:text-red-400" />
          </div>

          <div class="form-control w-full mb-6">
            <label class="label" for="title">
              <span class="label-text text-base-content">Page Description</span>
            </label>
            <Field
              type="text"
              name="description"
              id="description"
              placeholder="Enter your title"
              class="input input-bordered w-full"
              required
              v-model="formData.description"
            />
            <ErrorMessage name="description" class="mt-2 text-sm text-red-600 dark:text-red-400" />
          </div>
        </div>
        <!-- <hr class="border border-slate-700 mb-4" /> -->

        <!-- <div class="form-control w-full mb-2">
          <label class="label" for="image">
            <span class="label-text text-base-content">Image:</span>
          </label>
          <Field type="hidden" name="image" id="image" required v-model="formData.image" />
          <FileUpload
            :files="image"
            v-on:init="image"
            :accepted-file-types="['image/jpeg', 'image/png', 'image/jpg']"
            @updatefiles="(file) => (image = file)"
            required
          />
          <ErrorMessage name="image" class="text-sm text-red-600 dark:text-red-400" />
        </div> -->

        <div class="form-control w-full mb-6" v-if="formData.additional_info">
          <label class="label" for="additional_info[0]['desc']">
            <span class="label-text text-base-content">Information</span>
          </label>
          <Field
            as="textarea"
            rows="4"
            name="additional_info[0]['desc']"
            id="additional_info[0]['desc']"
            placeholder="Type your content here..."
            class="textarea textarea-bordered"
            v-model="formData.additional_info[0].desc"
          />
          <ErrorMessage
            name="additional_info[0]['desc']"
            class="mt-2 text-sm text-red-600 dark:text-red-400"
          />
        </div>

        <div class="form-control w-full mb-6">
          <label class="label" for="image">Image </label>
          <Field
            name="image"
            type="file"
            class="input input-bordered w-full"
            id="image"
            accept="image/png, image/jpeg, image/webp"
            @change="onLoadFile"
            v-model="formData.url"
          />
          <ErrorMessage name="image" class="mt-2 text-sm text-red-600 dark:text-red-400" />
          <div id="imgPreview" class="mt-4">
            <img
              :src="imagePreview"
              alt="Image Preview"
              class="w-full max-w-[300px] h-full max-h-[200px] rounded-lg bg-cover"
            />
          </div>
        </div>

        <div class="flex items-center justify-start py-4">
          <button
            :disabled="isLoading"
            type="submit"
            class="btn btn-primary"
            :class="{ 'cursor-wait': isLoading }"
          >
            <span v-if="isLoading" class="loading loading-dots loading-md"></span>
            <span v-else>Update</span>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
