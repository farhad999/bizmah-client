<template>
  <div class="product-card">
    <!-- Product Media -->
    <div class="product-media">
      <div>
        <img :src="`https://picsum.photos/300/400?random=${product}`"/>
      </div>

      <div class="badge discount">60% Off</div>
      <div class="quick-view-btn">
        <button>Quick View</button>
      </div>

    </div>

    <div class="product-card-bottom">
      <div class="product-title">Product 1</div>
      <div class="price-box">
        <span class="old-price">$120.00</span>
        <span class="new-price">$100.00</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object | Number,
    }
  }
}
</script>
