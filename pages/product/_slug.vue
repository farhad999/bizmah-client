<template>
  <div class="container product-view">

    <div class="row">
      <div class="col-12 mt-2 mb-4">
        <div>
          <nuxt-link to="/">Home</nuxt-link>
          <span class="mx-2">
            <i class="fa fa-chevron-right"></i>
          </span>
          <span>{{this.product.name}}</span>
        </div>
      </div>

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

    <hr />

    <div>
      <h4 class="product-section-title">Related products</h4>
      <div class="row">
        <ProductCard
          v-for="(product, index) in relatedProducts"
          class="col-6 col-md-3 col-xl-3"
          :key="index"
          :product="product"
        />
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
import ProductCard from "~/components/ProductCard.vue";

export default {
  components: {ProductCard, ProductDescription, ProductMediaThumb, ProductMedia, ProductDetail},
  data() {
    return {
      product: '',
      thumbIndex: 0,
      relatedProducts: [],
    }
  },
  computed: {
    images() {

      if (!this.product) {
        return [];
      }

      let thumbImage = {
        variation_id: null,
        image_url: computeImageUrl(this.product.image)
      };

      let galleryImages = this.product.images.map(item => ({
        variation_id: null,
        image_url: computeImageUrl(item.image)
      }))

      let variationImages = this.product.variations
        .filter(variation => variation.image)
        .map(variation => {
          return {
            variation_id: variation.id,
            image_url: computeImageUrl(variation.image)
          }
        });

      return [thumbImage, ...variationImages, ...galleryImages];
    },
  },
  async fetch() {
    let slug = this.$route.params.slug;
    try {
      this.product = await this.$axios.$get('/products/' + slug);
      this.relatedProducts = await this.$axios.$get('/get-related-products/' + slug)
    } catch (e) {

    }
  }
}
</script>
