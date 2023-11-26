<template>
  <div class="mt-3">
    <h2 class="description-head">Description</h2>

    <div><strong class="font-visby-bold">Product Details</strong></div>

    <div v-html="product.description"></div>
    <div><strong>Product Code: </strong>{{ product.sku }}</div>

    <div class="d-flex align-items-center my-3"
         :class="{'d-none d-block': direction === 'left'}"
    >
      <div class="me-5">
        <i class="fa fa-heart"></i>
        Wishlist
      </div>
      <div class="me-2">
        <i class="fa fa-share-alt"></i>
        Share
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    direction: {
      type: String,
      default: 'left'
    }
  }
}
</script>
