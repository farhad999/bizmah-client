<template>
  <div>
    <!-- Top Bar -->
    <div class="top-bar">
      <p>
        FREE SHIPPING FOR ORDERS ON AND ABOVE BDT2500 WITHIN Bangladesh
      </p>
    </div>
    <Header/>
    <Nuxt/>
    <Footer/>
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
  async fetch() {
    await this.$store.dispatch('product/getCategories')
  },
  computed: {
    cart() {
      return this.$store.state.cart.items;
    },
  },
  watch: {
    cart: {
      deep: true,
      handler(val) {
        //for unauth store cart in localstorage
        window.localStorage.setItem('cart', JSON.stringify(val));
      },
    },
  },

  async mounted() {
    let cartItems = localStorage.getItem('cart');
    if (cartItems && cartItems.length) {
      this.$store.commit('cart/SET_CART', JSON.parse(cartItems));
      await this.$store.dispatch('cart/getCartProducts')
    }
  }

}
</script>
