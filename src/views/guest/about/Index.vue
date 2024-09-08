<script setup>
import instance from '@/plugins/axios'
import { onMounted, ref } from 'vue'

const about = ref()

onMounted(async () => {
  await fetchArticles()
})

async function fetchArticles(url = `/about`) {
  try {
    const response = await instance.get(url)
    about.value = response.data.data
    if (about.value.additional_info) {
      about.value.additional_info = JSON.parse(about.value.additional_info)
    }
  } catch (error) {
    console.error('Error fetching about:', error)
  }
}
function nl2br(str) {
  if (!str) return ''
  return str.replace(/\n/g, '<br>')
}

function whatsappLink(number) {
  if (number.startsWith('08')) {
    return '+62 ' + number.substring(1)
  } else if (number.startsWith('8')) {
    return '+62 ' + number
  } else {
    return number
  }
}
</script>
<template>
  <div
    v-if="about"
    class="hero min-h-[50vh]"
    :style="{
      backgroundImage: `url(${about.image})`
    }"
  >
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="banner-middle">{{ about.title }}</h1>
        <h3 class="mb-5 text-3xl font-bold">{{ about.description }}</h3>
      </div>
    </div>
  </div>

  <div class="max-w-4xl mx-auto my-20 px-10" v-if="about">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-[#ed0089]">
        Dhagrafis | <span class="text-white font-thin text-3xl my-auto">Visual Storyteller</span>
      </h1>
    </div>
    <div class="max-w-xl mx-auto text-center mt-10">
      <div
        class="leading-20 tracking-wider"
        v-if="about.additional_info && about.additional_info[0]?.desc"
        v-html="nl2br(about.additional_info[0]?.desc)"
      ></div>
      <div class="leading-20 tracking-wider" v-else>
        Visual Storyteller yang berfokus pada fotografi, terutama untuk momen seperti wedding,
        prewedding, dan lainnya, setiap karya yang dihasilkan mampu menghidupkan kisah melalui
        gambar. <br />
        <br />
        Dengan tagline "Kisah dalam Cerita," setiap foto yang diambil bukan hanya sekadar tangkapan
        visual, melainkan sebuah narasi yang menggugah emosi dan membawa penikmat merasakan
        kedalaman cerita yang disampaikan.
      </div>

      <div class="my-10">
        <p class="text-[#ed0089] font-semibold text-xl lg:mb-1 mb-3 italic">
          More info, collaboration, freelance & pricelist :
        </p>
        <p>
          Based on
          <b v-if="about.additional_info && about.additional_info[0].address">{{
            about.additional_info[0].address
          }}</b>
          <b v-else>Krembung, Sidoarjo</b>
        </p>

        <p>
          Whatsapp
          <b v-if="about.additional_info && about.additional_info[0].phone">{{
            whatsappLink(about.additional_info[0].phone)
          }}</b>
          <b v-else>+62 85848250548</b>
        </p>
      </div>

      <div class="max-w-sm mx-auto">
        <img src="https://vindes.id/assets/img/logo-vindes.png" alt="" />
      </div>
    </div>
  </div>
</template>