<template>
  <div>

    <!-- Top Bar -->
    <div class="top-bar">
      <p>
        FREE SHIPPING FOR ORDERS ON AND ABOVE BDT2500 WITHIN Bangladesh
      </p>
    </div>
    <Nuxt/>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Footer,
  },
  async fetch(){
    await this.$store.dispatch('product/getCategories')
  }
}
</script>
