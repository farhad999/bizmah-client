<template>
  <div class="custom-swiper">
    <div
      ref="swiper"
      v-swiper="sliderOption"
    >
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
      <template v-if="sliderOption.navigation">
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </template>
    </div>
  </div>
</template>

<script>
const defaultOption = {
  loop: false,
  scrollbar: {
    draggable: false
  },
  spaceBetween: 20,
  slidesPerView: 4,
  watchSlidesVisibility: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: true,
};
export default {
  props: {
    options: Object,
  },
  data: function () {
    return {
      sliderOption: Object.assign( {}, defaultOption, this.options ),
    };
  },
};
</script>
