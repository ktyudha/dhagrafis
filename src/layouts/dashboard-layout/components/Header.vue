<script setup>
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import Swal from '@/plugins/sweetalert'

const themeStore = useThemeStore()
const { user, logout, error } = useAuthStore()
const router = useRouter()
const currentMode = themeStore.mode === 'system' ? themeStore.getSystemMode() : themeStore.mode
const currentTheme = ref(currentMode === 'light')

const signOut = async () => {
  Swal.fire({
    text: 'Apakah anda yakin mau keluar?',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Batal',
    confirmButtonText: 'Ya, Keluar',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isDismissed) return

    await logout()
    if (!error) {
      return router.push({ name: 'dashboard' })
    }

    Swal.fire({
      icon: 'error',
      text: 'Gagal Logout'
    })
  })
}

watch(currentTheme, () => {
  themeStore.setThemeMode(currentTheme.value ? 'light' : 'dark')
})
</script>

<template>
  <div class="navbar sticky top-0 bg-base-100 z-10 shadow-md">
    <div class="flex-1">
      <label for="left-sidebar-drawer" class="btn btn-ghost btn-circle drawer-button lg:hidden">
        <FontAwesomeIcon :icon="faBars" class="h-6 w-5" />
      </label>

      <div class="font-semibold text-xl lg:hidden">
        <RouterLink
          to="/"
          class="flex items-center justify-between hover:bg-base-content/[.1] hover:outline-none px-4 gap-2 rounded-lg"
        >
          <img class="w-10" src="/media/logo/pens.png" alt="Media PENS Logo" />
          Media PENS
        </RouterLink>
      </div>

      <h1 class="text-2xl font-semibold ml-2"></h1>
    </div>

    <div class="flex-none">
      <label class="swap swap-rotate">
        <input type="checkbox" class="theme-controller invisible" v-model="currentTheme" />

        <!-- sun icon -->
        <FontAwesomeIcon :icon="faSun" class="swap-on fill-current w-6 h-6" />

        <!-- moon icon -->
        <FontAwesomeIcon :icon="faMoon" class="swap-off fill-current w-6 h-6" />
      </label>

      <div class="dropdown dropdown-end ml-4">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :src="user.photo ?? '/media/avatars/default.jpg'" alt="profile" />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <div class="truncate">
              <div class="truncate">
                <span class="block text-sm font-semibold text-gray-900 dark:text-white">
                  {{ user.name }}
                </span>
                <span class="block text-sm truncate text-gray-900 dark:text-white">
                  {{ user.email }}
                </span>
              </div>
            </div>
          </li>
          <div class="divider mt-0 mb-0"></div>
          <li class="justify-between">
            <RouterLink to="/" class="text-balance"> Profile Settings </RouterLink>
          </li>
          <div class="divider mt-0 mb-0"></div>
          <li>
            <a @click="signOut" class="text-red-600 font-semibold">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
