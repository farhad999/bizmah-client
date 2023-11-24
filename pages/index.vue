<template>
  <div class="container-fluid">
    <HomeSlider />
    <FeaturedCategories />
  </div>
</template>

<script>

import FeaturedCategories from "@/components/FeaturedCategories.vue";
import HomeSlider from "@/components/HomeSlider.vue";
export default {
  name: 'IndexPage',
  components: {
    FeaturedCategories,
    HomeSlider
  }
}
</script>
