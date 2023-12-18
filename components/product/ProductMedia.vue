<template>
  <div>

    <CustomSwiper
      ref="mediaRef" :options="sliderOptions"
      swiper-class="items-1"
    >
      <div class="swiper-slide" :key="index" v-for="(image, index) in images">
        <nuxt-img img :src="image.image_url" alt="product-image"
                  class="w-100"
                  sizes="sm:100vw md:100vw lg:100vw"
                  v-if="image.image_url"
                  lazy
        />
      </div>
    </CustomSwiper>
    <div class="d-lg-none mt-2" v-if="!hideThumb">
      <ProductMediaThumb :images="images" direction="bottom"
                         @onThumbClick="(index)=>onClickThumb(index)"
      />
    </div>
  </div>
</template>

<script>


import CustomSwiper from "../CustomSwiper.vue";
import ProductMediaThumb from "./ProductMediaThumb.vue";

export default {
  components: {CustomSwiper, ProductMediaThumb},
  props: {
    images: {
      type: Array,
      required: true,
    },
    thumbIndex: {
      type: Number,
      default: 0
    },
    hideThumb: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sliderOptions: {
        //slidesPerView: 1,
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  methods: {
    onClickThumb(index) {
      this.$emit('onThumbClick', index)
    }
  },
  watch: {
    thumbIndex: function (val) {
      this.$refs.mediaRef.$swiper.slideTo(val);
    }
  },
}
</script>
