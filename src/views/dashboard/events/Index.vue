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

const event = ref({})
const loadingState = ref(false)
const paginateRef = ref()

const formSchema = object().shape({
  name: string().required('Masukkan nama event')
})

const destroy = async (slug) => {
  Alert.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isDismissed) return

    await ApiService({ requiresAuth: true })
      .delete('admin/events/' + slug)
      .then(() => {
        toast.success('Berhasil menghapus event')
        paginateRef.value.refetch()
      })
      .catch(() => {
        toast.error('Gagal menghapus event')
      })
  })
}

const submit = async (values, actions) => {
  loadingState.value = true

  await ApiService({ requiresAuth: true })
    .request({
      method: event.value.slug ? 'put' : 'post',
      url: event.value.slug ? 'admin/events/' + event.value.slug : 'admin/events',
      data: event.value
    })
    .then(() => {
      toast.success('Berhasil menyimpan event')
      document.getElementById('modal_event').close()
      event.value = {}
      paginateRef.value.refetch()
    })
    .catch((res) => {
      actions.setErrors(res.data.errors)
    })

  loadingState.value = false
}

const showModal = (data) => {
  event.value = { ...data }
  document.getElementById('modal_event').showModal()
}
</script>
<template>
  <h1 class="mb-8 text-3xl font-bold">Events</h1>

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
      <RouterLink to="/dashboard/events/create" class="btn btn-primary">
        <FontAwesomeIcon :icon="faPlus" />
        Create Event
      </RouterLink>
    </div>
  </div>

  <Paginate ref="paginateRef" @destroy="destroy" @showModal="showModal" />

  <!-- Modal -->
  <dialog id="modal_event" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <h3 class="font-bold text-lg">Create Event</h3>

      <Form :validation-schema="formSchema" @submit="submit">
        <div class="form-control w-full mt-4">
          <label class="label"> Event Name </label>
          <Field
            type="text"
            placeholder="Name"
            class="input input-bordered w-full"
            id="name"
            name="name"
            v-model="event.name"
            required
            autofocus
          />
          <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>
        <div class="form-control w-full mt-4">
          <label class="label"> Event Location </label>
          <Field
            type="text"
            placeholder="Location"
            class="input input-bordered w-full"
            id="location"
            name="location"
            v-model="event.location"
            required
            autofocus
          />
          <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>
        <div class="form-control grid grid-cols-2 gap-3 mt-4">
          <label class="label col-span-2"> Event Date </label>
          <label class="label text-sm"> Start Date </label>
          <label class="label text-sm"> End Date </label>
          <Field
            type="text"
            placeholder="Start Date"
            class="input input-bordered w-full"
            id="start_date"
            name="start_date"
            v-model="event.start_date"
            required
            autofocus
          />
          <Field
            type="text"
            placeholder="End Date"
            class="input input-bordered w-full"
            id="end_date"
            name="end_date"
            v-model="event.end_date"
            required
            autofocus
          />
          <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>
        <div class="form-control grid grid-cols-2 gap-3 mt-4">
          <label class="label col-span-2"> Event Time </label>
          <label class="label text-sm"> Start Time </label>
          <label class="label text-sm"> End Time </label>
          <Field
            type="text"
            placeholder="Start Time"
            class="input input-bordered w-full"
            id="start_time"
            name="start_time"
            v-model="event.start_time"
            required
            autofocus
          />
          <Field
            type="text"
            placeholder="End Date"
            class="input input-bordered w-full"
            id="end_time"
            name="end_time"
            v-model="event.end_time"
            required
            autofocus
          />
          <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>
        <div class="form-control w-full mt-4">
          <label class="label"> Event Description </label>
          <Field
            type="text"
            placeholder="Description"
            class="input input-bordered w-full"
            id="description"
            name="description"
            v-model="event.description"
            required
            autofocus
          />
          <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>
        <div class="form-control w-full mt-4">
          <label class="label"> Event Poster </label>
          <Field
            type="file"
            placeholder="Poster"
            class="input input-bordered w-full"
            id="poster"
            name="poster"
            v-model="event.poster"
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
