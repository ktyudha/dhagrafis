<script setup>
// import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import instance from '@/plugins/axios'

// fetching article
const articles = ref([])

onMounted(async () => {
  await fetchArticles()
})

async function fetchArticles(url = '/') {
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
  <div class="hero min-h-[60vh]" style="background-image: url('/image/bg_parallax.jpg')">
    <div class="bg-opacity-60"></div>
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-md">
        <img src="/image/logo_dhagrafis_white.png" alt="" />
      </div>
    </div>
  </div>

  <div class="carousel w-full mb-[9rem]">
    <template v-for="slider in articles.sliders" :key="slider.id">
      <div id="item1" class="carousel-item w-full">
        <img :src="slider.image" class="w-full" />
      </div>
    </template>
  </div>

  <div class="px-[6vw] mb-[9rem]">
    <div class="container-title d-flex">
      <img src="/image/katalog.svg" alt="" />
    </div>

    <div class="carousel carousel-center w-full lg:space-x-8 space-x-3 p-4">
      <template v-for="katalog in articles.keunggulan" :key="katalog.id">
        <div class="carousel-item flex-col">
          <img :src="katalog.image.lg" class="lg:w-[20vw] lg:h-[25vw] w-[40vw] h-[50vw]" />
          <h1 class="mt-4 text-2xl uppercase">{{ katalog.title }}</h1>
          <!-- <p class="mt-1 text-[#999]">60 Videos</p> -->
        </div>
      </template>
    </div>
  </div>

  <div class="px-[6vw] mb-[9rem] pt-[3rem] lg:pb-[5rem] pb-[1rem]" id="bg-art-desktop">
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

  <!-- <div class="px-[6vw] mb-[9rem]">
    <div class="container-title d-flex">
      <img class="image-title" src="https://vindes.id/assets/img/Program.png" alt="" />
    </div>

    <div class="carousel carousel-center w-full lg:space-x-8 space-x-3 p-4">
      <div class="carousel-item flex-col">
        <img
          src="https://vindesid.ap-south-1.linodeobjects.com/images/categories/SV-2022-09-09-03-59-57-4184a056486938e74cb2a183b3f22ed71c1e4565.jpg"
          class="lg:w-[20vw] lg:h-[25vw] w-[40vw] h-[50vw]"
        />
        <h1 class="mt-4 text-2xl uppercase">Halo</h1>
        <p class="mt-1 text-[#999]">60 Videos</p>
      </div>
      <div class="carousel-item flex-col">
        <img
          src="https://vindesid.ap-south-1.linodeobjects.com/images/categories/SV-2022-09-06-08-43-43-c11d78cbc41095ec2d06b12306d17ec1935bc8f5.png"
          class="lg:w-[20vw] lg:h-[25vw] w-[40vw] h-[50vw]"
        />
        <h1 class="mt-4 text-2xl uppercase">Halo</h1>
        <p class="mt-1 text-[#999]">60 Videos</p>
      </div>
      <div class="carousel-item flex-col">
        <img
          src="https://vindesid.ap-south-1.linodeobjects.com/images/categories/SV-2021-09-13-02-47-39-a507b64c7cd1ed4e4997a3d5f07314c9ff7c8f78.png"
          class="lg:w-[20vw] lg:h-[25vw] w-[40vw] h-[50vw]"
        />
        <h1 class="mt-4 text-2xl uppercase">Halo</h1>
        <p class="mt-1 text-[#999]">60 Videos</p>
      </div>
      <div class="carousel-item flex-col">
        <img
          src="https://vindesid.ap-south-1.linodeobjects.com/images/categories/SV-2022-02-24-13-03-04-5d0041d1352fb1e6e476e3d89b3003c9fb4282d5.jpg"
          class="lg:w-[20vw] lg:h-[25vw] w-[40vw] h-[50vw]"
        />
        <h1 class="mt-4 text-2xl uppercase">Halo</h1>
        <p class="mt-1 text-[#999]">60 Videos</p>
      </div>
      <div class="carousel-item flex-col">
        <img
          src="https://vindesid.ap-south-1.linodeobjects.com/images/categories/SV-2022-07-27-08-40-25-4e3cc97205af992dd08569e89342825fdf435c98.jpeg"
          class="lg:w-[20vw] lg:h-[25vw] w-[40vw] h-[50vw]"
        />
        <h1 class="mt-4 text-2xl uppercase">Halo</h1>
        <p class="mt-1 text-[#999]">60 Videos</p>
      </div>
      <div class="carousel-item flex-col">
        <img
          src="https://vindesid.ap-south-1.linodeobjects.com/images/categories/SV-2022-09-09-03-59-57-4184a056486938e74cb2a183b3f22ed71c1e4565.jpg"
          class="lg:w-[20vw] lg:h-[25vw] w-[40vw] h-[50vw]"
        />
        <h1 class="mt-4 text-2xl uppercase">Halo</h1>
        <p class="mt-1 text-[#999]">60 Videos</p>
      </div>
    </div>
  </div> -->

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
