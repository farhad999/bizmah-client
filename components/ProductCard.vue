<template>
  <nuxt-link :to="`/product/${product.slug}`">
    <div class="product-card">
      <!-- Product Media -->
      <div class="product-media">
        <div>
          <img :src="computeImageUrl(product.image)" alt="product-image"/>
        </div>

        <div class="badge discount">60% Off</div>
        <div class="quick-view-btn">
          <button>Quick View</button>
        </div>

      </div>

      <div class="product-card-bottom">
        <div class="product-title text-capitalize">{{ product.name }}</div>
        <div class="price-box">
          <span class="old-price">{{ product.min_old_price }}</span>
          <span class="new-price">{{ product.min_price }}</span>
        </div>
      </div>

    </div>
  </nuxt-link>
</template>

<script>
import {computeImageUrl} from "../utils/common";

export default {
  methods: {computeImageUrl},
  props: {
    product: {
      type: Object | Number,
    }
  }
}
</script>
