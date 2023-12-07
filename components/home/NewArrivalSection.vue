<template>
  <div class="pt-5 pb-2">
    <div>
      <h3 class="section-title">New Arrival</h3>
    </div>
    <div class="row">
      <div v-for="product in products"
           :key="product"
           class="col-md-3 col-sm-4 col-6"
      >
        <ProductCard
          :product="product"
        />
      </div>

      <div v-if="hasMore" class="col-12 d-flex justify-content-center my-4">
        <button class="dark-btn" @click="loadMore">
          <span v-if="!loading">Load More</span>
          <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>
      </div>
    </div>

  </div>
</template>
<script>
import ProductCard from "../ProductCard.vue";

export default {
  components: {ProductCard},
  async fetch(){
    await this.$store.dispatch('product/getNewArrivals')
  },
  computed: {
    products() {
      return this.$store.state.product.newArrivals.products;
    },
    loading(){
      return this.$store.state.product.newArrivals.loading
    },
    hasMore(){
      return this.$store.state.product.newArrivals.hasMore
    }
  },
  methods: {
    loadMore() {
      this.$store.dispatch('product/getNewArrivals')
    }
  }
}
</script>
