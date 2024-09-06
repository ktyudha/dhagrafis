<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
    <img src="https://vindes.id/assets/img/logo-vindes.png" class="h-10" alt="Flowbite Logo" />
  </RouterLink>
  <button
    data-collapse-toggle="navbar-dropdown"
    type="button"
    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#ed0089] hover:text-white rounded-lg md:hidden hover:bg-[#ed0089] focus:outline-none focus:ring-2"
    aria-controls="navbar-dropdown"
    aria-expanded="false"
  >
    <span class="sr-only">Open main menu</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  </button>
  <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
    <ul
      class="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0"
    >
      <li>
        <RouterLink
          to="/about"
          class="block uppercase py-2 px-3 text-white rounded hover:bg-[#ed0089] md:hover:bg-transparent md:border-0 md:hover:text-[#ed0089] md:p-0 dark:text-white md:dark:hover:text-[#ed0089] dark:hover:bg-[#ed0089] dark:hover:text-white md:dark:hover:bg-transparent"
          >About Us</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/contact"
          class="block uppercase py-2 px-3 text-white rounded hover:bg-[#ed0089] md:hover:bg-transparent md:border-0 md:hover:text-[#ed0089] md:p-0 dark:text-white md:dark:hover:text-[#ed0089] dark:hover:bg-[#ed0089] dark:hover:text-white md:dark:hover:bg-transparent"
          >Contact</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/jobs"
          class="block uppercase py-2 px-3 text-white rounded hover:bg-[#ed0089] md:hover:bg-transparent md:border-0 md:hover:text-[#ed0089] md:p-0 dark:text-white md:dark:hover:text-[#ed0089] dark:hover:bg-[#ed0089] dark:hover:text-white md:dark:hover:bg-transparent"
          >Jobs</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/katalog"
          class="block uppercase py-2 px-3 text-white rounded hover:bg-[#ed0089] md:hover:bg-transparent md:border-0 md:hover:text-[#ed0089] md:p-0 dark:text-white md:dark:hover:text-[#ed0089] dark:hover:bg-[#ed0089] dark:hover:text-white md:dark:hover:bg-transparent"
          >Katalog</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/promo"
          class="block uppercase py-2 px-3 text-white rounded hover:bg-[#ed0089] md:hover:bg-transparent md:border-0 md:hover:text-[#ed0089] md:p-0 dark:text-white md:dark:hover:text-[#ed0089] dark:hover:bg-[#ed0089] dark:hover:text-white md:dark:hover:bg-transparent"
          >Promo</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
