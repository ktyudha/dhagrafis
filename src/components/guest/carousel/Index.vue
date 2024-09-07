<template>
  <swiper
    :modules="modules"
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      <img :src="slide.image" alt="Slide image" class="w-full" />
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default {
  name: 'CustomCarousel',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    slides: {
      type: Array,
      required: true
    },
    slidesPerView: {
      type: Number,
      default: 3
    },
    spaceBetween: {
      type: Number,
      default: 50
    }
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y]
    }
  }
}
</script>
