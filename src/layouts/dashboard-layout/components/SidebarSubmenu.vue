<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  menu: Object
})

const { user } = useAuthStore()
const route = useRoute()

const isExpanded = ref(props.menu.submenu.filter((m) => m.name === route.name)[0])

const checkPermission = (permission) => user?.permissions?.includes(permission)
</script>

<template>
  <div class="flex flex-col">
    <div class="w-full block" @click="() => (isExpanded = !isExpanded)">
      <div class="inline-flex items-center gap-2">
        <FontAwesomeIcon :icon="menu.icon" class="h-6 w-6" />
        {{ menu.label }}
      </div>
      <FontAwesomeIcon
        :icon="faChevronDown"
        class="w-5 h-5 mt-1 float-right delay-400 duration-500 transition-all"
        :class="{ 'rotate-180': isExpanded }"
      />
    </div>

    <div class="w-full" :class="{ hidden: !isExpanded }">
      <ul class="menu menu-compact">
        <li v-for="(submenu, k) in menu.submenu" :key="k">
          <RouterLink v-if="checkPermission(submenu.permission)" :to="submenu.route">
            <FontAwesomeIcon :icon="submenu.icon" />
            {{ submenu.label }}
            <span
              v-if="route.name == submenu.name"
              class="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
              aria-hidden="true"
            ></span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
