<template>
  <div class="swiper-carousel"
       :class="'space-'+space"
  >
    <div
      ref="pvCarousel"
      v-swiper="sliderOption"
    >
      <div class="swiper-wrapper" :class="swiperClass">
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
  spaceBetween: 0,
  slidesPerView: 'auto',
  watchSlidesVisibility: true,
  clickable: true,
  isCustomNav: false
};
export default {
  props: {
    options: Object,
    swiperClass: String,
    space: {
      type: Number,
      default: 0,
    }
  },
  data: function () {
    return {
      sliderOption: Object.assign({}, defaultOption, this.options),
    };
  },
  mounted: function () {
    let self = this;
    this.$nextTick(() => {
      if (self.$refs.pvCarousel) {
        self.$refs.pvCarousel.swiper.emit('update');
      }
    })
  },
};
</script>
