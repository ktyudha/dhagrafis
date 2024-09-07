<script setup>
import instance from '@/plugins/axios'
import { onMounted, ref } from 'vue'

const data = ref([])

const promo = ref([])
const meta = ref({})
const allPage = ref({})
const openPages = ref(1)

onMounted(async () => {
  await fetchInfo()
  await fetchPromo()
})

async function fetchInfo(url = `/promo`) {
  try {
    const response = await instance.get(url)
    data.value = response.data.data
    if (data.value.info.additional_info) {
      data.value.info.additional_info = JSON.parse(data.value.info.additional_info)
    }
  } catch (error) {
    console.error('Error fetching contact:', error)
  }
}

async function fetchPromo(url = `/gallery?page=${openPages.value}`) {
  try {
    const response = await instance.get(url)
    promo.value = response.data.data
    meta.value = response.data.meta
    allPage.value = meta.value.links
  } catch (error) {
    console.error('Error fetching promo:', error)
  }
}

function changePage(currentPage) {
  window.scrollTo({ top: 500, behavior: 'smooth' })
  openPages.value = currentPage
  fetchPromo()
}
</script>
<template>
  <div
    v-if="data.info"
    class="hero min-h-[50vh] w-full"
    :style="{
      backgroundImage: `url(${data.info.image})`
    }"
  >
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="banner-middle">{{ data.info.title }}</h1>
        <h3 class="mb-5 text-3xl font-bold">{{ data.info.description }}</h3>
      </div>
    </div>
  </div>
  <div class="max-w-4xl mx-auto mt-20 mb-10 lg:px-10 px-5" v-if="data.info">
    <div class="text-center">
      <h1 class="text-2xl text-center mx-auto font-semibold">
        {{ data.info.additional_info[0].desc }}
      </h1>
      <!-- <h1 class="text-2xl text-center mx-auto font-semibold">
        Yuk, abadikan momen berharga Anda dan dapatkan penawaran istimewa untuk kenangan yang tak
        terlupakan!
      </h1> -->
    </div>
  </div>

  <div class="px-[6vw] mb-[9rem]">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <template v-for="gallery in promo" :key="gallery.id">
        <div>
          <img class="h-auto max-w-full rounded-lg" :src="gallery.image" alt="" />
        </div>
      </template>
    </div>
  </div>
  <nav v-if="promo.length >= 9">
    <ul class="flex items-center justify-center gap-3 mb-20">
      <li v-for="page in allPage" :key="page">
        <button
          @click="changePage(page.url ? page.url.split('=')[1] : null)"
          :class="[
            'justify-center px-4 h-10 text-base font-medium rounded-lg',
            page.url ? 'bg-[#ed0089] text-white' : 'bg-[#d696bb] text-white cursor-not-allowed'
          ]"
          :disabled="!page.url"
        >
          {{ page.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>