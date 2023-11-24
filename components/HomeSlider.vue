<template>
  <section class="py-4">
    <CustomSwiper
      class="home-slider"
      :options="homeSlider"
    >
      <div class="home-slide swiper-slide" v-for="(slide,index) in [1, 2, 3, 4]">
        <img
          class="slide-bg"
          :src="`https://picsum.photos/1600/500?random=${index}`"
          alt="slider image"
          loading="lazy"
        />
      </div>
    </CustomSwiper>
  </section>
</template>

<script>

import CustomSwiper from "@/components/CustomSwiper.vue";

export default {
  components: {
    CustomSwiper
  },
  props: {
    sliders: {
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
      }
    };
  }
};
</script>
