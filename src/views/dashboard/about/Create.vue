<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { onBeforeMount, ref } from 'vue'
import { object, string } from 'yup'
import FileUpload from '@/components/FileUpload.vue'
import ApiService from '@/services/ApiService'
import { useRouter } from 'vue-router'
import Alert from '@/plugins/sweetalert'

const isLoading = ref(false)
const image = ref([])
const formData = ref({})
const categories = ref([])
const router = useRouter()

const formSchema = object().shape({
  title: string().max(255).required('Masukkan judul'),
  body: string().required('Masukkan body post'),
  category_id: string().required('Pilih kategori')
})

const store = async (values, actions) => {
  if (!image.value.length) {
    actions.setFieldError('image', 'Masukkan gambar')
    return
  }
  formData.value.image = image.value[0].file

  isLoading.value = true

  await ApiService({ requiresAuth: true })
    .post('admin/articles', formData.value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      Alert.fire({
        text: 'Berhasil menyimpan artikel!',
        icon: 'success'
      }).then(() => {
        formData.value = {}
        image.value = []

        router.push({ name: 'articles.edit', params: { slug: res.data.article.slug } })
      })
    })
    .catch((res) => {
      actions.setErrors(res.data.errors)
    })

  isLoading.value = false
}

onBeforeMount(async () => {
  categories.value = await ApiService()
    .get('categories')
    .then((res) => res.data.categories)
})
</script>

<template>
  <h1 class="mb-8 text-3xl font-bold">Create Articles</h1>

  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <Form :validation-schema="formSchema" @submit="store">
        <div class="form-control w-full mb-6">
          <label class="label" for="title">
            <span class="label-text text-base-content">Title:</span>
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
          <label class="label" for="category_id">
            <span class="label-text text-base-content">Category:</span>
          </label>
          <Field
            as="select"
            name="category_id"
            id="category_id"
            class="select select-bordered w-full"
            v-model="formData.category_id"
            placeholder="Pilih"
          >
            <template v-if="categories.length">
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </template>
          </Field>
          <ErrorMessage name="category_id" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>

        <div class="form-control w-full mb-2">
          <label class="label" for="image">
            <span class="label-text text-base-content">Image:</span>
          </label>
          <Field type="hidden" name="image" id="image" required v-model="formData.image" />
          <FileUpload
            :files="image"
            :accepted-file-types="['image/jpeg', 'image/png', 'image/jpg']"
            @updatefiles="(file) => (image = file)"
            required
          />
          <ErrorMessage name="image" class="text-sm text-red-600 dark:text-red-400" />
        </div>

        <div class="form-control w-full mb-6">
          <label class="label" for="body">
            <span class="label-text text-base-content">Content:</span>
          </label>
          <Field
            as="textarea"
            rows="30"
            name="body"
            id="body"
            placeholder="Type your content here..."
            class="textarea textarea-bordered"
            v-model="formData.body"
          />
          <ErrorMessage name="body" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>

        <div class="flex items-center justify-end py-4">
          <button
            :disabled="isLoading"
            type="submit"
            class="btn btn-primary"
            :class="{ 'cursor-wait': isLoading }"
          >
            <span v-if="isLoading" class="loading loading-dots loading-md"></span>
            <span v-else>Create Article</span>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
