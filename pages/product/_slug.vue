<template>
  <div class="container product-view">
    <div class="row py-3">
      <div class="col-lg-4">
        <div class="d-none d-lg-block">
          <ProductMediaThumb
            :images="images" :product="product" direction="left"
            @onThumbClick="(index)=>thumbIndex = index"
          />
        </div>
        <div class="d-none d-lg-block">
          <ProductDescription :product="product"/>
        </div>
      </div>

      <div class="col-lg-4">
        <ProductMedia
          :product="product"
          :images="images"
          :thumbIndex="thumbIndex"
          @onThumbClick="(index)=>thumbIndex=index"
        />
      </div>

      <div class="col-lg-4">
        <ProductDetail v-if="product" :product="product"/>
      </div>
      <div class="d-lg-none">
        <ProductDescription :product="product"/>
      </div>

    </div>
  </div>
</template>

<script>
import ProductMedia from "../../components/product/ProductMedia.vue";
import ProductDetail from "../../components/product/ProductDetail.vue";
import ProductMediaThumb from "../../components/product/ProductMediaThumb.vue";
import ProductDescription from "../../components/product/ProductDescription.vue";
import {computeImageUrl} from "../../utils/common";

export default {
  components: {ProductDescription, ProductMediaThumb, ProductMedia, ProductDetail},
  data() {
    return {
      product: '',
      thumbIndex: 0,
    }
  },
  computed: {
    images() {

      if (!this.product) {
        return [];
      }

      let images = this.product.images.map(item => ({variation_id: null, image_url: computeImageUrl(item.image)}))

      let variationImages = this.product.variations
        .filter(variation => variation.image)
        .map(variation => {
          return {
            variation_id: variation.id,
            image_url: computeImageUrl(variation.image)
          }
        });

      images = [...images, ...variationImages];

      return images;
    },
  },
  async fetch() {
    let slug = this.$route.params.slug;
    try {
      this.product = await this.$axios.$get('/products/' + slug);
    } catch (e) {

    }
  }
}
</script>
