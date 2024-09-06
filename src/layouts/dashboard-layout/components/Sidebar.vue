<script setup>
import { useRoute } from 'vue-router'
import MainMenuConfig from '@/router/MainMenuConfig'
import SidebarSubmenu from './SidebarSubmenu.vue'
import { useAuthStore } from '@/stores/auth'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const route = useRoute()
const { user } = useAuthStore()

const checkPermission = (permission) => {
  if (typeof permission === 'string') return user?.permissions?.includes(permission)

  return user?.permissions?.some((item) =>
    permission.some((searchString) => item.includes(searchString))
  )
}
</script>

<template>
  <div class="drawer-side z-30 mt-16 lg:mt-0">
    <label for="left-sidebar-drawer" class="drawer-overlay"></label>
    <ul class="menu pt-2 w-80 bg-base-100 min-h-full text-base-content">
      <li class="mb-2 font-semibold text-xl hidden lg:block">
        <RouterLink to="/dashboard">
          <!-- <img class="w-10" src="/media/logo/pens.png" alt="Media PENS Logo" /> -->
          <img src="https://vindes.id/assets/img/fg_logo.png" alt="" />
        </RouterLink>
      </li>

      <li v-for="(menu, k) in MainMenuConfig" :key="k">
        <SidebarSubmenu
          v-if="menu.submenu && checkPermission(menu.permissions)"
          :menu="menu"
          class="my-1"
        />
        <RouterLink
          v-else-if="checkPermission(menu.permission)"
          :to="menu.route"
          :class="route.name === menu.name ? 'font-semibold bg-base-200' : 'font-normal'"
          class="my-1"
        >
          <FontAwesomeIcon :icon="menu.icon" class="h-6 w-6" />
          {{ menu.label }}
          <span
            v-if="route.name === menu.name"
            class="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
            aria-hidden="true"
          ></span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
