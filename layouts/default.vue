<template>
  <div>
    <!-- Top Bar -->
    <div class="top-bar">
      <p>
        FREE SHIPPING FOR ORDERS ON AND ABOVE BDT2500 WITHIN Bangladesh
      </p>
    </div>
    <Header @openMobileMenu="mobileMenuStatus = true"/>
    <Nuxt/>
    <Footer/>

    <!-- Quick Product -->

    <b-modal id="quick-product"
             hide-footer
             size="xl"
             :visible="quickViewModal"
             @hidden="$store.dispatch('product/closeQuickView')"
    >
      <QuickProduct/>
    </b-modal>

    <!-- Mobile Menu -->

    <MobileMenu :mobileMenuStatus="mobileMenuStatus"
                @close="mobileMenuStatus = false"
    />

  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "../components/Navbar/Header.vue";
import QuickProduct from "~/components/product/QuickProduct.vue";
import MobileMenu from "~/components/MobileMenu.vue";

export default {
  components: {
    QuickProduct,
    Header,
    Footer,
    MobileMenu,
  },
  data() {
    return {
      mobileMenuStatus: false,
    }
  },
  async fetch() {
    await this.$store.dispatch('product/getCategories')
    await this.$store.dispatch('common/getSettings')
  },
  computed: {
    cart() {
      return this.$store.state.cart.items;
    },
    quickViewModal() {
      return this.$store.state.product.quickViewModal
    }
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
    if (this.$auth.loggedIn) {
      //auth user pull carts from server
      await this.$store.dispatch('cart/getCartItems');
    } else {
      let cartItems = localStorage.getItem('cart');
      if (cartItems && cartItems.length) {
        this.$store.commit('cart/SET_CART', JSON.parse(cartItems));
        await this.$store.dispatch('cart/getCartProducts')
      }
    }

    //await this.$auth.fetchUser('user');

  }

}
</script>
