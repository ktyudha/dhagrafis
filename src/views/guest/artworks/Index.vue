<script setup>
import Header from '@/components/guest/header/index.vue'
import { RouterLink } from 'vue-router';
import instance from '@/plugins/axios'
import { onMounted, ref } from 'vue'


const artwork = ref([])
const meta = ref({})
const allPage = ref({})
const openPages = ref(1)

onMounted(async () => {
  await fetchArtwork()
})

async function fetchArtwork(url = `/artworks?page=${openPages.value}`) {
  try {
    
    const response = await instance.get(url)
    artwork.value = response.data.data
    meta.value = response.data.meta
    allPage.value = meta.value.links
    console.log(allPage)
    console.log(artwork)
  } catch(error) {
    console.error('Error fetching artwork:', error)
  }
}

function changePage(currentPage) {
  window.scrollTo({ top: 500, behavior: 'smooth' })
  openPages.value = currentPage
  fetchArtwork()
  console.log(openPages.value)
}

</script>

<template>
  <Header />
  <h1 class="text-center text-2xl mt-10">Pojok Karya</h1>
  <!-- masonry layout -->
  <div class="columns-1 md:columns-2 lg:columns-3 gap-10 xl:w-[1200px] mx-auto space-y-3 mt-32 p-5">
    <RouterLink :to="'artworks/' + artwork.slug" v-for="artwork in artwork" :key="artwork.id">
      <div class="break-inside-avoid border rounded-2xl hover:shadow-2xl transition duration-100 ease-in-out mt-10">
        <img class="rounded-t-2xl" :src="artwork.image" alt="test" />
        <div class="p-4">
          <h1 class="text-center text-base font-semibold">{{ artwork?.title }}</h1>
          <p class="text-xs">{{ artwork?.caption }}</p>
          <p class="text-xs">By: <span class="font-bold">{{ artwork.author?.name }}</span></p>
        </div>
      </div>
    </RouterLink>
  </div>
  <!-- pagination -->
  <nav>
      <ul class="flex items-center justify-center gap-11 mb-20">
        <li v-for="page in allPage" :key="page">
          <button
            @click="changePage(page.url.split('=')[1])"
            class="flex items-center justify-center px-4 h-10 text-base font-medium text-[#1E40AF] bg-white border border-gray-300 rounded-lg hover:bg-[#FBBF24] hover:text-white focus:bg-[#FBBF24]"
          >
            {{ page.label }}
          </button>
        </li>
      </ul>
  </nav>

    
</template>
