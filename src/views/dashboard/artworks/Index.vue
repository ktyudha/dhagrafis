<script setup>
import { RouterLink } from 'vue-router';
import ApiService from '@/services/ApiService';
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import Paginate from './Paginate.vue'
import Alert from '@/plugins/sweetalert'
import { toast } from 'vue3-toastify'

const paginateRef = ref()

onMounted(async () => {
  paginateRef.value.refetch()
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
      .delete('admin/artworks/' + slug)
      .then(() => {
        toast.success('Berhasil menghapus pojok karya')
        paginateRef.value.refetch()
      })
      .catch(() => {
        toast.error('Gagal menghapus pojok karya')
      })
  })
}


</script>

<template>
    <h1 class="mb-8 text-3xl font-bold">Artworks</h1>
    <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 mb-6">
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
        <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <RouterLink to="/dashboard/artworks/create" class="btn btn-primary">
                <FontAwesomeIcon :icon="faPlus" />
                Create Artwork
            </RouterLink>
        </div>
    </div>
    <Paginate ref="paginateRef" @destroy="destroy" />
</template>