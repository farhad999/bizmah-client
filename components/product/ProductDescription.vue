<template>
  <div>
    <div class="mt-3" v-if="product && !loading">

      <h2 class="description-head">Description</h2>

      <div><strong class="font-visby-bold">Product Details</strong></div>

      <div v-html="product.description"></div>
      <div><strong>Product Code: </strong>{{ product.sku }}</div>

      <div class="d-flex align-items-center my-3"
           :class="{'d-none d-block': direction === 'left'}"
      >
        <div class="mr-5">
          <i class="fa fa-heart"></i>
          Wishlist
        </div>
        <div class="mr-2">
          <i class="fa fa-share-alt"></i>
          Share
        </div>
      </div>
    </div>

    <div v-else class="mt-3">

      <h2 class="skeleton w-70 h-16 mb-2"></h2>

      <div class="skeleton w-50 h-14 mb-2"></div>

      <div class="skeleton w-100 h-14 mb-2"></div>
      <div class="skeleton w-100 h-14 mb-2"></div>
      <div class="skeleton w-40 h-14 mb-2"></div>

      <div class="skeleton w-100 h-14 mb-2"></div>
      <div class="skeleton w-100 h-14 mb-2"></div>
      <div class="skeleton w-40 h-14 mb-2"></div>

      <div class="skeleton w-50 h-14 mb-2"></div>

      <div class="d-flex align-items-center my-3"
           :class="{'d-none d-block': direction === 'left'}"
      >
        <div class="mr-5">
          <i class="fa fa-heart"></i>
          Wishlist
        </div>
        <div class="mr-2">
          <i class="fa fa-share-alt"></i>
          Share
        </div>
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
    },
    loading: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
