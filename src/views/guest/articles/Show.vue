<script setup>
import Breadcrumb from '@/components/guest/breadcrumb/Index.vue'
import { RouterLink, useRoute } from 'vue-router'
import instance from '@/plugins/axios'
import { ref, onMounted } from 'vue'

const route = useRoute()
const url = ref()
const articles = ref([])
const related = ref([])
const latestArticle = ref({})

onMounted(() => {
  url.value = route.path
  fetchArticles()
})

async function fetchArticles(fetch = url.value) {
  try {
    const response = await instance.get(fetch)
    const latest = await instance.get('/latest-articles')
    latestArticle.value = latest.data.data
    articles.value = response.data.article
    related.value = response.data.releated_articles
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

function changeArticle(newUrl) {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  url.value = newUrl
  fetchArticles()
}
</script>

<template>
  <div class="w-full bg-[#103968] h-[73px]"></div>
  <div class="p-10 md:p-32">
    <Breadcrumb />
    <!-- article grid -->
    <div class="mt-16 grid md:grid-cols-4 gap-11">
      <div class="col-span-3">
        <!-- title -->
        <h1 class="text-center font-bold text-2xl md:text-5xl">{{ articles.title }}</h1>
        <!-- image cover -->
        <div class="w-full mt-10 mx-auto">
          <img :src="articles.image" alt="Gambar Artikel" class="w-auto max-h-[395px] mx-auto" />
        </div>
        <!-- article content -->
        <div class="mt-10 w-full">
          <p class="text-xl text-justify">
            {{ articles.body }}
          </p>
        </div>
      </div>
      <div class="hidden md:flex flex-col gap-5">
        <h1 class="font-bold text-3xl">Artikel Terkini</h1>
        <RouterLink
          :to="newest.slug"
          v-for="newest in latestArticle"
          :key="newest.id"
          @click="changeArticle('/articles/' + newest.slug)"
        >
          <div class="w-full bg-[#E0E0E0] rounded-2xl hover:shadow-2xl">
            <div class="p-8">
              <h1 class="font-bold text-lg text-black">
                {{ newest.title }}
              </h1>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="mt-10">
      <h3 class="text-xl font-bold">Artikel Sejenis</h3>
      <div class="grid md:grid-cols-3 gap-[60px] mx-auto">
        <RouterLink
          :to="article.slug"
          class="mt-3 md:w-[360px] p-5 rounded-xl bg-gray-200"
          v-for="article in related"
          :key="article.id"
          @click="changeArticle('/articles/' + article.slug)"
        >
          <img :src="articles.image" alt="Gambar Artikel" class="max-h-[200px] w-full" />
          <h1 class="font-bold text-center text-black">{{ article.title }}</h1>
        </RouterLink>
      </div>
    </div>
    <!-- comment -->
    <div class="mt-5">
      <form>
        <label for="chat" class="sr-only">Add comment...</label>
        <div class="flex items-center px-3 py-2 rounded-lg border border-[#1E40AF]">
          <img src="@/assets/image/user.svg" class="border border-black rounded-full" alt="" />
          <textarea
            id="chat"
            rows="1"
            class="block mx-4 p-2.5 w-full text-sm text-white bg-[#1E40AF] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add comment ..."
          ></textarea>
          <button
            type="submit"
            class="inline-flex justify-center p-2 text-[#1E40AF] rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              class="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path
                d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"
              />
            </svg>
            <span class="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
    <!-- comment list -->
  </div>
</template>
