<script>
export default {
  computed: {
    pageTitle() {
      return this.$route.meta.pageTitle || 'Judul'
    }
  }
}
</script>

<template>
  <div class="w-full h-[449px] bg-[#103968] text-white relative">
    <div class="w-full h-full hidden absolute md:flex items-end justify-end">
      <img src="/src/assets/image/Group 137.png" alt="Pattern" />
    </div>
    <div class="px-7 py-28 absolute lg:p-28 ml-2">
      <img src="/src/assets/image/pens.png" alt="LogoPens" />
      <h1 class="font-bold text-5xl mt-8 mr-3">{{ pageTitle }}</h1>
    </div>
  </div>
</template>
