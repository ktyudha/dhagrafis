<script setup>
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { object, string } from 'yup'
import Paginate from './Paginate.vue'
import ApiService from '@/services/ApiService'
import Alert from '@/plugins/sweetalert'
import { toast } from 'vue3-toastify'

const category = ref({})
const loadingState = ref(false)
const paginateRef = ref()

const formSchema = object().shape({
  name: string().required('Masukkan nama category')
})

const destroy = async (id) => {
  Alert.fire({
    title: 'Apakah anda yakin?',
    text: 'Data yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus',
    cancelButtonText: 'Batalkan',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isDismissed) return

    await ApiService({ requiresAuth: true })
      .delete('admin/categories/' + id)
      .then(() => {
        toast.success('Berhasil menghapus kategori')
        paginateRef.value.refetch()
      })
      .catch(() => {
        toast.error('Gagal menghapus kategori')
      })
  })
}

const submit = async (values, actions) => {
  loadingState.value = true

  await ApiService({ requiresAuth: true })
    .request({
      method: category.value.id ? 'put' : 'post',
      url: category.value.id ? 'admin/categories/' + category.value.id : 'admin/categories',
      data: category.value
    })
    .then(() => {
      toast.success('Berhasil menyimpan kategori')
      document.getElementById('modal_category').close()
      category.value = {}
      paginateRef.value.refetch()
    })
    .catch((res) => {
      actions.setErrors(res.data.errors)
    })

  loadingState.value = false
}

const showModal = (data) => {
  category.value = { ...data }
  document.getElementById('modal_category').showModal()
}
</script>
<template>
  <h1 class="mb-8 text-3xl font-bold">Categories</h1>

  <div
    class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 mb-6"
  >
    <div class="w-full md:w-1/2">
      <form class="flex items-center">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon :icon="faMagnifyingGlass" />
          </div>
          <input
            type="text"
            id="simple-search"
            class="input block w-full pl-10 p-2"
            placeholder="Search"
            required
          />
        </div>
      </form>
    </div>
    <div
      class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
    >
      <button class="btn btn-primary" onclick="modal_category.showModal()">
        <FontAwesomeIcon :icon="faPlus" />
        Create Category
      </button>
    </div>
  </div>

  <Paginate ref="paginateRef" @destroy="destroy" @showModal="showModal" />

  <!-- Modal -->
  <dialog id="modal_category" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <h3 class="font-bold text-lg">Create Category</h3>

      <Form :validation-schema="formSchema" @submit="submit">
        <div class="form-control w-full mt-4">
          <label class="label"> Category Name </label>
          <Field
            type="text"
            placeholder="Name"
            class="input input-bordered w-full"
            id="name"
            name="name"
            v-model="category.name"
            required
            autofocus
          />
          <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>
        <div class="modal-action">
          <button
            :disabled="loadingState"
            type="submit"
            class="btn btn-primary px-6"
            :class="{ 'cursor-wait': loadingState }"
          >
            <span v-if="loadingState" class="loading loading-dots loading-md"></span>
            <span v-else>Save</span>
          </button>
        </div>
      </Form>
    </div>
  </dialog>
</template>
