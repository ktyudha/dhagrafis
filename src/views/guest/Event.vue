<script setup>
import Breadcrumb from '@/components/guest/breadcrumb/Index.vue'
import Header from '@/components/guest/header/index.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import instance from '@/plugins/axios'
import { onMounted, ref } from 'vue'

const events = ref([])
const meta = {}
const allPage = ref({})
const openPages = ref(1)

onMounted(async () => {
  await fetchEvent()
})

async function fetchEvent(url = `/events?page=${openPages.value}`) {
  try {
    const response = await instance.get(url)
    events.value = response.data.data
    meta.value = response.data.meta
    allPage.value = meta.value.links
    console.log(events)
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}

function changePage(currentPage) {
  window.scrollTo({ top: 500, behavior: 'smooth' })
  openPages.value = currentPage
  fetchEvent()
  console.log(openPages.value)
}

function formatDate(dateString) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const parts = dateString.split(' ')
  const day = parts[0]
  const month = months.indexOf(parts[1]) + 1
  const year = parts[2]

  return `${year}${month.toString().padStart(2, '0')}${day.padStart(2, '0')}`
}

const getCalendarUrl = (event) => {
  const encodedTitle = encodeURIComponent(event.name)
  const encodedDetails = encodeURIComponent(event.description)
  const encodedLocation = encodeURIComponent(event.location)
  const startDate = formatDate(event.start_date)
  const endDate = formatDate(event.end_date)
  const startTime = event.start_time
  const endTime = event.end_time

  const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodedTitle}&details=${encodedDetails}&location=${encodedLocation}&dates=${startDate}T${startTime.replace(':', '')}00/${endDate}T${endTime.replace(':', '')}00&ctz=Asia%2FJakarta`

  return url
}
</script>

<template>
  <Header />
  <div class="mt-[50px]">
    <form action="" method="get" class="flex items-center justify-center gap-5">
      <input
        type="text"
        name="event"
        class="w-[671px] h-[46px] border border-[#EAB308] rounded-xl"
      />
      <button
        type="submit"
        class="bg-[#EAB308] rounded-xl p-3 w-[72px] h[46px] flex items-center justify-center"
      >
        <SearchIcon />
      </button>
    </form>
  </div>
  <!-- breadcrumb -->
  <div class="w-fit mx-auto">
    <Breadcrumb />
    <!-- event content -->
    <div
      class="mt-[70px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-between gap-[38px] w-fit mx-auto px-2 mb-[190px]"
    >
      <div
        class="w-full md:max-w-[375px] h-auto rounded-xl shadow-2xl flex flex-col justify-between"
        v-for="event in events"
        :key="event.id"
      >
        <div>
          <div class="relative w-full h-[275px] bg-slate-400 rounded-t-xl">
            <img class="mx-auto h-full w-full rounded-t-xl" :src="event.poster" alt="poster" />
            <h1
              class="font-extrabold text-white bg-gradient-to-t from-black to-transparent p-4 w-full text-2xl absolute bottom-0"
            >
              {{ event.start_date }}
            </h1>
          </div>
          <h1 class="text-center font-bold mt-2 text-2xl">{{ event.name }}</h1>
        </div>
        <div class="w-full flex flex-col items-center">
          <div class="flex flex-col justify-center items-center gap-5 mx-10 mt-5">
            <div class="flex flex-col gap-5">
              <div class="flex items-center gap-5">
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 21"
                >
                  <g
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z"
                    />
                  </g>
                </svg>
                <p class="font-medium text-sm">{{ event.location }}</p>
              </div>
              <div class="flex items-center gap-5">
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p class="font-medium text-sm">{{ event.start_time }} - {{ event.end_time }}</p>
              </div>
            </div>
            <a :href="getCalendarUrl(event)" target="_blank">
              <button class="bg-[#EAB308] text-white text-xs py-2 px-10 mt-4 rounded-xl mb-4">
                Add To Calendar
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
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
