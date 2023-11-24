<template>
  <div class="container-fluid">
    <HomeSlider/>
    <FeaturedCategories/>

    <NewArrivalSection/>
  </div>
</template>

<script>

import FeaturedCategories from "@/components/FeaturedCategories.vue";
import HomeSlider from "@/components/HomeSlider.vue";
import ProductSection from "../components/ProductSection.vue";
import NewArrivalSection from "../components/home/NewArrivalSection.vue";

export default {
  name: 'IndexPage',
  components: {
    NewArrivalSection,
    ProductSection,
    FeaturedCategories,
    HomeSlider
  }
}
</script>
