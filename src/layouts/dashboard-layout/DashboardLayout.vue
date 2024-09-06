<script setup>
import PageContent from './components/PageContent.vue'
import Sidebar from './components/Sidebar.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
watch(route, () => {
  document.getElementById('left-sidebar-drawer').click()
})
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="left-sidebar-drawer" type="checkbox" class="drawer-toggle" />
    <PageContent />
    <Sidebar />
  </div>
</template>
