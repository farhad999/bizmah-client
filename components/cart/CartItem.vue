<template>
  <div class="cart-item">
    <div class="product-image-container">
      <nuxt-img
        :src="product.image"
        alt="product image"
        sizes="sm:100px"
        v-if="product.image"
      />
    </div>

    <div class="cart-info">
      <div class="product-info">
        <div>
          <div class="product-title">{{ product.name }}</div>
          <div>{{ product.variation }}</div>
          <div>{{ product.sku }}</div>
        </div>

        <div class="price">{{ product.price | priceFormat }}</div>
      </div>

      <div class="d-flex mt-2 align-items-center justify-content-between">
        <ProductQuantityInput
          :qty="product.quantity"
          @changeQty="onQuantityChange"
        />
        <button class="cart-remove" @click="removeFromCart"><i class="fa fa-trash"></i></button>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold text-15">Item Total</div>
        <div class="price">{{ product.price * product.quantity | priceFormat }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import ProductQuantityInput from "~/components/product/ProductQuantityInput.vue";
import {computeImageUrl} from "~/utils/common";

export default {
  props: {
    product: Object,
  },
  components: {
    ProductQuantityInput
  },
  data() {
    return {}
  },
  methods: {
    computeImageUrl,
    onQuantityChange(qty) {
      this.$store.dispatch('cart/updateQuantity', {cart: this.product, quantity: qty});
    },
    removeFromCart() {
      console.log("cart remove", this.product)
      this.$store.dispatch('cart/removeFromCart', this.product)
    },
  }
}
</script>
