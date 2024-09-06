<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import Paginate from './Paginate.vue'
import Alert from '@/plugins/sweetalert'
import ApiService from '@/services/ApiService'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'

const paginateRef = ref()

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
      .delete('admin/articles/' + id)
      .then(() => {
        toast.success('Berhasil menghapus artikel')
        paginateRef.value.refetch()
      })
      .catch(() => {
        toast.error('Gagal menghapus artikel')
      })
  })
}
</script>

<template>
  <h1 class="mb-8 text-3xl font-bold">About Us</h1>

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
      <RouterLink to="/dashboard/articles/create" class="btn btn-primary">
        <FontAwesomeIcon :icon="faPlus" />
        Create About
      </RouterLink>
    </div>
  </div>

  <Paginate ref="paginateRef" @destroy="destroy" />
</template>
