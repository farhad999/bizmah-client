<template>
  <section class="container-fluid">
    <div class="horizontal-bar mt-2"></div>
    <div class="featured-categories">
      <div class="section-title">Shop By Category</div>
        <CustomSwiper
        swiper-class="items-2 items-sm-3 items-md-4 items-lg-6"
        >
          <div :key="index" v-for="(cat, index) in categories"
               class="featured-category-item swiper-slide">
            <nuxt-link :to="`/category/${cat.slug}`">
              <div class="category-image-container">
                <img :src="computeImageUrl(cat.image)" alt="cat"/>
              </div>
              <div class="category-title">{{ cat.name }}</div>
            </nuxt-link>
          </div>
        </CustomSwiper>
    </div>
    <div class="horizontal-bar mt-2"></div>
  </section>
</template>

<script>
import {computeImageUrl} from "../utils/common";
import CustomSwiper from "~/components/CustomSwiper.vue";

export default {
  components: {CustomSwiper},
  methods: {computeImageUrl},
  data() {
    return {
      categorySwiper: {
        slidesPerView: 2,
        spaceBetween: 6,
        breakpoints: {
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 8,
          }
        }
      }
    }
  },
  computed: {
    categories() {
      return this.$store.state.product.categories;
    }
  }
}
</script>
