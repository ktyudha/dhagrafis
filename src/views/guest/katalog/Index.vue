<script setup>
import instance from '@/plugins/axios'
import { onMounted, ref } from 'vue'

const data = ref([])

const katalog = ref([])
const meta = ref({})
const allPage = ref({})
const openPages = ref(1)

onMounted(async () => {
  await fetchInfo()
  await fetchKatalog()
})

async function fetchInfo(url = `/katalog/info`) {
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

async function fetchKatalog(url = `/katalog?page=${openPages.value}`) {
  try {
    const response = await instance.get(url)
    katalog.value = response.data.data
    meta.value = response.data.meta
    allPage.value = meta.value.links
  } catch (error) {
    console.error('Error fetching:', error)
  }
}

function changePage(currentPage) {
  window.scrollTo({ top: 500, behavior: 'smooth' })
  openPages.value = currentPage
  fetchKatalog()
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
  <div class="max-w-4xl mx-auto mt-20 lg:px-10 px-5">
    <div
      class="flex w-full overflow-x-auto md:items-center md:justify-center pb-4 md:pb-8 md:flex-wrap mb-4"
    >
      <button
        type="button"
        class="rounded-full border border-[#ed0089] bg-[#ed0089] md:text-base text-xs text-white ease-in-out duration-200 font-medium px-4 py-1.5 text-center md:me-3 mx-1.5 mb-3"
      >
        Engagement</button
      ><button
        type="button"
        class="rounded-full border border-[#ed0089] bg-[#ed0089] md:text-base text-xs text-white ease-in-out duration-200 font-medium px-4 py-1.5 text-center md:me-3 mx-1.5 mb-3"
      >
        Prewedding</button
      ><button
        type="button"
        class="rounded-full border border-[#ed0089] bg-[#ed0089] md:text-base text-xs text-white ease-in-out duration-200 font-medium px-4 py-1.5 text-center md:me-3 mx-1.5 mb-3"
      >
        Wedding</button
      ><button
        type="button"
        class="rounded-full border border-[#ed0089] bg-[#ed0089] md:text-base text-xs text-white ease-in-out duration-200 font-medium px-4 py-1.5 text-center md:me-3 mx-1.5 mb-3"
      >
        Events
      </button>
    </div>
  </div>

  <div class="px-[6vw] mb-[9rem]">
    <div class="lg:gap-3 lg:columns-4 md:columns-3 md:gap-4 columns-2 gap-4">
      <template v-for="katalog in katalog" :key="katalog.id">
        <div class="mx-auto">
          <img
            class="md:h-auto md:max-w-full rounded-lg md:mb-3 lg:mb-3 mb-2"
            :src="katalog.image"
            :alt="katalog.title"
          />
        </div>
      </template>
    </div>
  </div>
  <nav v-if="allPage.length >= 9">
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