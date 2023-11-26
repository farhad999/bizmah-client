<template>
  <section class="container-fluid">
    <div class="horizontal-bar mt-2"></div>
    <div class="featured-categories">
      <div class="section-title">Shop By Category</div>
      <div v-swiper="categorySwiper">
        <div class="swiper-wrapper">
          <div :key="index" v-for="(cat, index) in categories"
               class="category-item swiper-slide">
            <nuxt-link :to="`/category/${cat.slug}`">
              <div class="category-image-container">
                <img :src="computeImageUrl(cat.image)" alt="cat"/>
              </div>
              <div class="category-title">{{ cat.name }}</div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="horizontal-bar mt-2"></div>
  </section>
</template>

<script>
import {computeImageUrl} from "../utils/common";

export default {
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
