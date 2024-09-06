<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { object, string } from 'yup'
import ApiService from '@/services/ApiService'
import { toast } from 'vue3-toastify'

const event = ref({})
const loadingState = ref(false)
const paginateRef = ref()

const formSchema = object().shape({
  poster: string().required('Masukkan poster event'),
  name: string().required('Masukkan nama event'),
  location: string().required('Masukkan lokasi event'),
  start_date: string().required('Masukkan hari event dimulai'),
  end_date: string().required('Masukkan hari event berakhir'),
  start_time: string().required('Masukkan waktu mulai event'),
  end_time: string().required('Masukkan waktu event berakhir'),
  description: string().required('Masukkan deskripsi event event')
})

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
</script>

<template>
  <div>
    <h3 class="mb-8 text-3xl font-bold">Create Event</h3>

    <Form :validation-schema="formSchema" @submit="submit">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <div class="form-control w-full mt-4">
            <label class="label"> Event Poster </label>
            <Field
              type="file"
              placeholder="Poster"
              class="input input-bordered w-full"
              id="poster"
              name="poster"
              required
              autofocus
              v-model="formData.poster"
            />
            <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
          </div>
        </div>
        <div>
          <div class="form-control w-full mt-4">
            <label class="label"> Event Name </label>
            <Field
              type="text"
              placeholder="Name"
              class="input input-bordered w-full"
              id="name"
              name="name"
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
              required
              autofocus
            />
            <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
          </div>
          <div class="form-control w-full grid grid-cols-2 gap-3 mt-4">
            <label class="label col-span-2"> Event Date </label>
            <label class="label text-sm"> Start Date </label>
            <label class="label text-sm"> End Date </label>
            <Field
              type="text"
              placeholder="Start Date"
              class="input input-bordered w-full"
              id="start_date"
              name="start_date"
              required
              autofocus
            />
            <Field
              type="text"
              placeholder="End Date"
              class="input input-bordered w-full"
              id="end_date"
              name="end_date"
              required
              autofocus
            />
            <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
          </div>
          <div class="form-control w-full grid grid-cols-2 gap-3 mt-4">
            <label class="label col-span-2"> Event Time </label>
            <label class="label text-sm"> Start Time </label>
            <label class="label text-sm"> End Time </label>
            <Field
              type="text"
              placeholder="Start Time"
              class="input input-bordered w-full"
              id="start_time"
              name="start_time"
              required
              autofocus
            />
            <Field
              type="text"
              placeholder="End Date"
              class="input input-bordered w-full"
              id="end_time"
              name="end_time"
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
              required
              autofocus
            />
            <ErrorMessage name="name" class="mt-2 text-sm text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>
      <div class="modal-action">
        <button :disabled="loadingState" type="submit" class="btn btn-primary px-6">
          <span v-if="loadingState" class="loading loading-dots loading-md"></span>
          <span v-else>Save</span>
        </button>
      </div>
    </Form>
  </div>
</template>
