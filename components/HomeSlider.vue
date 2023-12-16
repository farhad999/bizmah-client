<template>
  <section class="py-4">
    <CustomSwiper
      class="home-slider"
      :options="homeSlider"
    >
      <div class="home-slide swiper-slide" v-for="(slide,index) in slides" :key="index">
        <img
          class="slide-bg"
          :src="computeImageUrl(slide.image)"
          alt="slider image"
          loading="lazy"
        />
      </div>
    </CustomSwiper>
  </section>
</template>

<script>

import CustomSwiper from "@/components/CustomSwiper.vue";
import {computeImageUrl} from "~/utils/common";

export default {
  methods: {computeImageUrl},
  components: {
    CustomSwiper
  },
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      homeSlider: {
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: true,
        navigation: true,
      }
    };
  }
};
</script>
