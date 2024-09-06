<script setup>
import instance from '@/plugins/axios'
import { onMounted, ref } from 'vue'

const contact = ref()

onMounted(async () => {
  await fetchArticles()
})

async function fetchArticles(url = `/contact`) {
  try {
    const response = await instance.get(url)
    contact.value = response.data.contact
    if (contact.value.additional_info) {
      contact.value.additional_info = JSON.parse(contact.value.additional_info)
    }
  } catch (error) {
    console.error('Error fetching contact:', error)
  }
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
    v-if="contact"
    class="hero min-h-[50vh] w-full"
    :style="{
      backgroundImage: `url(${contact.image})`
    }"
  >
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="banner-middle">{{ contact.title }}</h1>
        <h3 class="mb-5 text-3xl font-bold">{{ contact.description }}</h3>
      </div>
    </div>
  </div>
  <div class="max-w-4xl mx-auto my-20" v-if="contact">
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-16 px-10">
      <div>
        <div class="rounded h-[250px]" v-html="contact.additional_info[0].gmap"></div>
        <!-- <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.3271336522957!2d112.575291775686!3d-7.539256192474065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78755cb6f0de67%3A0xcb94857010932813!2sSweetself.studios!5e0!3m2!1sid!2sid!4v1725264188574!5m2!1sid!2sid"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          class="rounded w-[100%] h-[100%]"
        ></iframe> -->
        <div>
          <h2 class="uppercase font-bold tracking-wider text-xl mt-3 leading-10 text-[#ed0089]">
            Kantor
          </h2>
          <p class="my-5">
            {{ contact.additional_info[0].address }} <br />Phone :
            {{ whatsappLink(contact.additional_info[0].phone) }} <br />E-mail :
            {{ contact.additional_info[0].email }}
          </p>
        </div>
      </div>

      <div>
        <h2
          class="uppercase font-bold lg:tracking-widest tracking-wider lg:text-3xl text-xl text-[#ed0089] lg:leading-10"
        >
          {{ contact.additional_info[0].title }}
        </h2>
        <p class="my-5">
          {{ contact.additional_info[0].desc }}
        </p>

        <div class="form-control w-full mb-3">
          <div class="label">
            <span class="label-text font-bold">Name</span>
          </div>
          <input
            type="text"
            placeholder="Full Name"
            class="input w-full bg-white focus:outline-offset-1 focus:outline-[#ed0089]"
          />
        </div>
        <div class="form-control w-full mb-3">
          <div class="label">
            <span class="label-text font-bold">Telp/No. Hp</span>
          </div>
          <input
            type="text"
            placeholder="Whatsapp"
            class="input w-full bg-white focus:outline-offset-1 focus:outline-[#ed0089]"
          />
        </div>
        <div class="form-control w-full mb-3">
          <div class="label">
            <span class="label-text font-bold">Email</span>
          </div>
          <input
            type="text"
            placeholder="Email"
            class="input w-full bg-white focus:outline-offset-1 focus:outline-[#ed0089]"
          />
        </div>
        <div class="form-control w-full mb-3">
          <div class="label">
            <span class="label-text font-bold">Message</span>
          </div>
          <textarea
            class="textarea bg-white focus:outline-offset-1 focus:outline-[#ed0089] h-24"
            placeholder="Message"
          ></textarea>
        </div>

        <button class="btn-gelombang">Kirim</button>
      </div>
    </div>
  </div>
</template>