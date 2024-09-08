<script setup>
// import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import instance from '@/plugins/axios'
import CustomCarousel from '@/components/guest/carousel/Index.vue'

// fetching article
const articles = ref([])

onMounted(async () => {
  await fetchArticles()
})

async function fetchArticles(url = '/home') {
  try {
    const response = await instance.get(url)
    articles.value = response.data.data
    console.log(articles.value)
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}
</script>

<template>
  <div
    class="hero md:min-h-[60vh] min-h-[90vh]"
    style="background-image: url('/image/bg_parallax.jpg')"
  >
    <div class="bg-opacity-60"></div>
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-md">
        <img src="/image/logo_dhagrafis_white.png" alt="" class="lg:w-full w-4/5 mx-auto" />
      </div>
    </div>
  </div>
  <custom-carousel
    :slides="articles.sliders"
    :slidesPerView="1"
    :scrollbar="false"
    :breakpoints="{
      768: { slidesPerView: 1, pagination: false },
      1024: { slidesPerView: 1 }
    }"
  />

  <!-- 
  <div class="carousel w-full mb-[9rem]">
    <template v-for="slider in articles.sliders" :key="slider.id">
      <div id="item1" class="carousel-item w-full">
        <img :src="slider.image" class="w-full" />
      </div>
    </template>
  </div> -->

  <div class="px-[6vw] md:mb-[9rem] mb-[3rem]">
    <div class="container-title md:mb-[27px] mb-0 d-flex">
      <img src="/image/katalog.svg" alt="" />
    </div>

    <div class="carousel carousel-center w-full lg:space-x-8 space-x-3 p-4">
      <template v-for="katalog in articles.keunggulan" :key="katalog.id">
        <div class="carousel-item flex-col">
          <img :src="katalog.image" class="lg:w-[20vw] lg:h-[25vw] w-[40vw] h-[50vw]" />
          <h1 class="mt-4 text-2xl uppercase">{{ katalog.title }}</h1>
          <!-- <p class="mt-1 text-[#999]">60 Videos</p> -->
        </div>
      </template>
    </div>
  </div>

  <div
    class="px-[6vw] md:mb-[9rem] mb-[3rem] md:pt-[3rem] lg:pb-[5rem] pb-[4rem]"
    id="bg-art-desktop"
  >
    <div class="container-title">
      <img src="/image/promo.svg" alt="" />
    </div>

    <div class="carousel carousel-center w-full lg:space-x-8 space-x-3.5 p-4">
      <template v-for="promo in articles.galleries" :key="promo.id">
        <div class="carousel-item flex-col">
          <img :src="promo.image" class="lg:w-[20vw] lg:h-[20vw] w-[25vw] h-[25vw]" />
          <h1 class="mt-4 text-2xl uppercase">{{ promo.title }}</h1>
          <!-- <p class="mt-1 text-[#999]">60 Videos</p> -->
        </div>
      </template>
    </div>
  </div>

  <div class="px-[6vw] mb-[9rem]">
    <div class="p-4 max-w-4xl mx-auto bg-black">
      <div class="grid lg:grid-cols-2 grid-cols-1">
        <img
          src="https://api-ctd.dmmspot.id/app/program/thumbnail/default.png"
          class="h-40 w-40 my-5 mx-auto"
          alt=""
        />
        <div class="my-auto lg:text-left text-center">
          <h1 class="text-3xl font-bold">DHAGRAFIS</h1>
          <p class="text-[#ed0089] ml-1">Visual Storyteller</p>
          <div class="lg:mt-10 mt-2 lg:mb-0 mb-5">
            <div class="badge text-white hover:text-[#ed0089] badge-outline mx-1 mt-1">
              FOTOGRAFI
            </div>
            <div class="badge text-white hover:text-[#ed0089] badge-outline mx-1 mt-1">WEB DEV</div>
            <div class="badge text-white hover:text-[#ed0089] badge-outline mx-1 mt-2">
              NETWORKING
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
