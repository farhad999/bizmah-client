<template>
  <nuxt-link :to="`/product/${product.slug}`">
    <div class="product-card">
      <!-- Product Media -->
      <div class="product-media">
        <div>
          <img :src="computeImageUrl(product.image)" alt="product-image"
               class="primary-image"
          />

          <img :src="computeImageUrl(product.secondary_image)" alt="secondary-image"
               v-if="product.secondary_image"
               class="secondary-image"
          />

        </div>

        <div class="badge discount" v-if="discount>0">
          {{discount}}% Off
        </div>
        <div class="quick-view-btn">
          <button @click.prevent="$store.dispatch('product/openQuickView', product)">Quick View</button>
        </div>

      </div>

      <div class="product-card-bottom">
        <div class="product-title text-capitalize">{{ product.name }}</div>
        <div class="price-box">
          <span class="old-price" v-if="product.min_old_price">{{ product.min_old_price |priceFormat }}</span>
          <span class="new-price">{{ product.min_price |priceFormat }}</span>
        </div>
      </div>

    </div>
  </nuxt-link>
</template>

<script>
import {computeImageUrl} from "../utils/common";

export default {
  methods: {computeImageUrl,
  openQuick(){

  }
  },
  props: {
    product: {
      type: Object | Number,
    }
  },
  computed: {
    discount() {
      if (this.product.min_old_price) {
        return Math.round(((this.product.min_old_price - this.product.min_price) / this.product.min_old_price) * 100);
      }
      return 0;
    }
  }
}
</script>
