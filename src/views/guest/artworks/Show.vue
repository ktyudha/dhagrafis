<script setup>
import Header from '@/components/guest/header/index.vue'
import { useRoute } from 'vue-router'
import instance from '@/plugins/axios'
import { ref, onMounted } from 'vue'

const route = useRoute()
const url = ref()
const artworks = ref([])

onMounted(() => {
  url.value = route.path
  fetchArtwork()
})

async function fetchArtwork(fetch = url.value) {
  try {
    const response = await instance.get(fetch)
    artworks.value = response.data.data
    console.log(artworks)
    console.log(fetch)
  } catch (error) {
    console.error('error fetch artwork: ', error)
  }
}
</script>

<template>
  <Header />
  <h1 class="text-center text-2xl mt-10">Pojok Karya</h1>
  <div
    class="w-fit border bg-white dark:bg-gray-700 mb-10 shadow-2xl mx-auto mt-10 py-10 flex justify-center items-center rounded-2xl"
  >
    <div class="flex w-fit flex-col items-center gap-5">
      <img
        :src="artworks.image"
        alt=""
        class="border h-full w-auto max-w-[60%] border-black rounded-2xl"
      />
      <div class="w-full max-w-[65%] text-black dark:text-white">
        <h1 class="text-center font-bold">{{ artworks?.title }}</h1>
        <p class="text-xs md:text-base lg:text-lg">{{ artworks?.caption }}</p>
        <p class="text-xs md:text-base lg:text-lg"><b>By:</b> {{ artworks.author?.name }}</p>
      </div>
    </div>
  </div>
</template>
