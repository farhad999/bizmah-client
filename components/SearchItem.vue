<template>
  <div class="d-flex" @click="onItemClick">
    <div class="image-container">
      <img :src="computeImageUrl(item.image)">
    </div>
    <div>
      <div class="product-title">{{ item.name }}</div>
      <div><span class="old-price">{{ item.min_old_price }}</span>
        <span class="new-price">{{ item.min_price }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {computeImageUrl} from "../utils/common";

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    computeImageUrl,
    onItemClick() {
      this.$router.push(`/product/${this.item.slug}`)
      this.$emit('close')
    }
  }
}
</script>
