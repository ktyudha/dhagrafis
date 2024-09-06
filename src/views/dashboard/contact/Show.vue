<script setup>
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import ApiService from '@/services/ApiService'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const route = useRoute()

const { data: article, isLoading } = useQuery({
  queryKey: ['articles', route.params.slug],
  queryFn: () =>
    ApiService({ requiresAuth: true })
      .get('admin/articles/' + route.params.slug)
      .then((res) => res.data.article)
})

const getInitials = (name) => {
  // Split the name into words
  const words = name.split(' ')
  // Extract the first letter of each word and join them
  const initials = words.map((word) => word.charAt(0)).join('')
  return initials.toUpperCase() // Convert to uppercase if needed
}
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full max-w-3xl">
      <template v-if="isLoading">
        <div class="mb-1 skeleton w-full h-9"></div>
        <div class="mb-8 skeleton w-28 h-9"></div>
        <div class="mb-8 skeleton w-52 h-9"></div>
        <div class="mb-8 skeleton w-full h-96"></div>
        <div class="flex flex-col gap-4 w-full">
          <div
            v-for="(i, idx) in new Array(10).fill(1)"
            :key="idx"
            class="skeleton h-4 w-full"
          ></div>
        </div>
      </template>
      <template v-else>
        <h1 class="mb-1 text-3xl font-bold">{{ article.title }}</h1>
        <h2 class="mb-8 text-lg text-slate-700 dark:text-slate-400">
          <FontAwesomeIcon :icon="faTag" /> {{ article.category.name }}
        </h2>

        <div class="flex mb-8">
          <div class="avatar placeholder me-3">
            <div class="bg-neutral text-neutral-content rounded-full w-11">
              <!-- <img v-if="isLoading" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        <span v-else>{{ getInitials(article.author.name) }}</span> -->
              <span>{{ getInitials(article.author.name) }}</span>
            </div>
          </div>
          <div>
            <div>{{ article.author.name }}</div>
            <div class="text-sm">{{ article.author.email }}</div>
          </div>
        </div>

        <img :src="article.image" class="w-full mb-8" alt="Tailwind CSS Carousel component" />

        <p>{{ article.body }}</p>
      </template>
    </div>
  </div>
</template>
