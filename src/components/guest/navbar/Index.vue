<script setup>
import NavItem from './NavItem.vue'

window.onscroll = function () {
  scrollFunction()
}

function scrollFunction() {
  const navbar = document.getElementById('navbar')

  if (window.scrollY > 20) {
    navbar.classList.add('md:bg-[#000]')
    navbar.classList.remove('md:bg-transparent')
  } else {
    navbar.classList.add('md:bg-transparent')
    navbar.classList.remove('md:bg-[#000]')
  }
}
</script>

<template>
  <nav id="navbar" class="bg-[#000] md:bg-transparent fixed w-full top-0 start-0 z-50">
    <div class="flex flex-wrap items-center justify-between mx-auto p-4 lg:px-[112px]">
      <NavItem />
    </div>
  </nav>
</template>
