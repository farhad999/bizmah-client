<template>
  <div>
    <!-- Top Bar -->
    <div class="top-bar">
      <p>
        FREE SHIPPING FOR ORDERS ON AND ABOVE BDT2500 WITHIN Bangladesh
      </p>
    </div>
    <Header />
    <Nuxt/>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "../components/Navbar/Header.vue";

export default {
  components: {
    Header,
    Footer,
  },
  async fetch(){
    await this.$store.dispatch('product/getCategories')
  }
}
</script>
