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
import NewArrivalSection from "../components/home/NewArrivalSection.vue";

export default {
  name: 'IndexPage',
  components: {
    NewArrivalSection,
    FeaturedCategories,
    HomeSlider
  },
  data(){
    return {
      user: null,
    }
  }
}
</script>
