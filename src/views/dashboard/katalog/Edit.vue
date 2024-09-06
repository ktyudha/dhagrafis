<script setup>
import ApiService from '@/services/ApiService'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { onBeforeMount, ref } from 'vue'
import { object, string } from 'yup'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'

const route = useRoute()
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
  title: string().required('Please fill the title'),
  //   image: string().required('Please input file with extension: .jpg, .jpeg, .png'),
  description: string().required('Please fill the caption')
})

const store = async (values, actions) => {
  isLoading.value = true
  formData.value._method = 'PUT'

  await ApiService({ requiresAuth: true })
    .post(`keunggulan/${formData.value.id}`, formData.value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      toast.success('create katalog success')
    })
    .catch((res) => {
      console.error('error:', res)
      actions.setErrors(res.data.errors)
    })
  isLoading.value = false
}

onBeforeMount(async () => {
  const katalog = await ApiService({ requiresAuth: true })
    .get('keunggulan/' + route.params.id)
    .then((res) => res.data.katalog)

  formData.value = katalog
  imagePreview.value = katalog.image ? [katalog.image] : []
})
</script>

<template>
  <h1 class="mb-8 text-3xl font-bold">Katalog</h1>

  <Form :validation-schema="formSchema" @submit="store">
    <div class="form-control w-full mt-4">
      <div class="form-control w-full mb-6">
        <label class="label" for="title">Title </label>
        <Field
          name="title"
          type="text"
          class="input input-bordered w-full"
          placeholder="Title"
          id="title"
          required
          v-model="formData.title"
        />
        <ErrorMessage name="title" class="mt-2 text-sm text-red-600 dark:text-red-400" />
      </div>

      <div class="form-control w-full mb-6">
        <label class="label" for="description_short">Short Description</label>
        <Field
          as="textarea"
          rows="2"
          name="description_short"
          type="textarea"
          placeholder="Type your content here..."
          class="textarea textarea-bordered"
          id="description_short"
          required
          v-model="formData.description_short"
        />
        <ErrorMessage
          name="description_short"
          class="mt-2 text-sm text-red-600 dark:text-red-400"
        />
      </div>

      <div class="form-control w-full mb-6">
        <label class="label" for="description">
          <span class="label-text text-base-content">Description</span>
        </label>
        <Field
          as="textarea"
          rows="4"
          name="description"
          id="description"
          placeholder="Type your content here..."
          class="textarea textarea-bordered"
          required
          v-model="formData.description"
        />
        <ErrorMessage name="description" class="mt-2 text-sm text-red-600 dark:text-red-400" />
      </div>

      <div class="form-control w-full mb-6">
        <label class="label" for="image">Image </label>
        <Field
          name="image"
          type="file"
          class="input input-bordered w-full"
          id="image"
          required
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
          <span v-else class="px-4">Save</span>
        </button>
      </div>
    </div>
  </Form>
</template>

