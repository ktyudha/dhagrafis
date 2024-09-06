<script setup>
import Header from '@/components/guest/header/index.vue'
import Breadcrumb from '@/components/guest/breadcrumb/Index.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import instance from '@/plugins/axios'
import { onMounted, ref } from 'vue'

const articles = ref([])
const meta = ref({})
const allPage = ref({})
const openPages = ref(1)
const latestArticle = ref({})

onMounted(async () => {
  await fetchArticles()
})

async function fetchArticles(url = `/articles?page=${openPages.value}`) {
  try {
    const response = await instance.get(url)
    const latest = await instance.get('/latest-articles')
    latestArticle.value = latest.data.data
    articles.value = response.data.data
    meta.value = response.data.meta
    allPage.value = meta.value.links
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

function changePage(currentPage) {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  openPages.value = currentPage
  fetchArticles()
}
</script>

<template>
  <div>
    <!-- Header -->
    <Header />
    <!-- Searchbar -->
    <div class="mt-[55px]">
      <form action="" method="get" class="flex items-center justify-center gap-5">
        <input
          type="text"
          name="event"
          class="md:w-[671px] md:h-[46px] border border-[#EAB308] rounded-xl"
        />
        <button
          type="submit"
          class="bg-[#EAB308] rounded-xl p-3 md:w-[72px] md:h-[46px] flex items-center justify-center"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
    <!-- Article -->
    <div class="p-10 md:p-32">
      <Breadcrumb />
      <div class="mt-16 grid md:grid-cols-4 gap-11">
        <div class="md:col-span-3">
          <RouterLink :to="'articles/' + article.slug" v-for="article in articles" :key="article.id"
            ><div class="flex flex-col hover:shadow-2xl w-full">
              <div class="p-3">
                <div class="md:flex gap-4">
                  <div class="w-full md:w-1/2 mx-auto">
                    <img
                      :src="article.image"
                      alt="Gambar artikel"
                      class="w-auto max-h-[720px] mx-auto"
                    />
                  </div>
                  <div class="w-full md:w-1/2">
                    <div class="h-full grid content-between">
                      <div>
                        <h2 class="font-bold">{{ article.category.name }}</h2>
                        <h1 class="font-black text-lg md:text-2xl">
                          {{ article.title }}
                        </h1>
                        <p class="pr-3">
                          {{ article.excerpt }}
                        </p>
                      </div>
                      <div class="flex justify-between">
                        <div>
                          <p>
                            BY <span class="font-bold">{{ article.author.name }}</span>
                          </p>
                        </div>
                        <div>
                          <p>{{ article.published_at }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div></RouterLink
          >
        </div>
        <div class="hidden md:flex flex-col gap-5">
          <h1 class="font-bold text-3xl">Artikel Terkini</h1>
          <RouterLink
            :to="'articles/' + newest.slug"
            v-for="newest in latestArticle"
            :key="newest.id"
            ><div class="w-full bg-[#E0E0E0] rounded-2xl hover:shadow-2xl">
              <div class="p-8">
                <h1 class="font-bold text-lg text-black">
                  {{ newest.title }}
                </h1>
              </div>
            </div></RouterLink
          >
        </div>
      </div>
    </div>
    <!-- Pagination -->
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
  </div>
</template>
