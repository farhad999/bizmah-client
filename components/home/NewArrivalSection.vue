<template>
  <div class="pt-5 pb-2">
    <div>
      <h3 class="section-title">New Arrival</h3>
    </div>
    <div class="row">
      <div v-for="product in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]"
           :key="product"
           class="col-md-3 col-sm-4 col-6"
      >
        <ProductCard
          :product="product"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from "../ProductCard.vue";

export default {
  components: {ProductCard}
}
</script>
