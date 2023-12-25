<template>
  <div class="container-fluid">
    <HomeSlider :slides="slides"/>
    <div class="page-container">
      <FeaturedCategories/>
      <NewArrivalSection/>
    </div>
  </div>
</template>

<script>

import FeaturedCategories from "@/components/FeaturedCategories.vue";
import HomeSlider from "@/components/HomeSlider.vue";
import NewArrivalSection from "../components/home/NewArrivalSection.vue";

export default {
  name: 'IndexPage',
  components: {
    NewArrivalSection,
    FeaturedCategories,
    HomeSlider
  },
  data() {
    return {
      user: null,
    }
  },
  computed: {
    slides() {
      return this.$store.state.common.homeSlides;
    }
  },
  async fetch() {
    await this.$store.dispatch('common/getHomeSlides')
  },
  mounted() {
    if (process.browser) {
      this.$fb.track('ViewContent');
    }
  }
}
</script>
