<template>
  <section class="container-fluid">
    <div class="horizontal-bar mt-2"></div>
    <div class="featured-categories">
      <div class="section-title">Shop By Category</div>
      <div v-swiper="categorySwiper">
        <div class="swiper-wrapper">
          <div :key="index" v-for="(cat, index) in categories"
               class="category-item swiper-slide">
            <div class="category-image-container">
              <img :src="computeImageUrl(cat.image)" alt="cat"/>
            </div>
            <div class="category-title">{{cat.name}}</div>
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
        slidesPerView: 8,
        spaceBetween: 10,
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
