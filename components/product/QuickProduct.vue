<template>
  <div class="product-view" style="min-height: 60vh">
    <div class="row">
      <div class="col-md-6">

        <div class="d-flex">

          <!-- Thumb -->
          <div style="width: 150px" class="pr-2">
            <div class="mb-2 w-100 overflow-hidden"
                 @click="thumbIndex = index"
                 :key="index"
                 v-for="(image,index) in images">
              <nuxt-img :src="image.image_url"
                        alt=""
                        class="w-100"
                        sizes="sm:150px"
              />
            </div>

          </div>

          <ProductMedia :images="images" :thumbIndex="thumbIndex"
                        hide-thumb
          />

        </div>

      </div>

      <div class="col-md-6 mt-2">

        <QuickProductDetail v-if="product" :product="product"/>

      </div>

    </div>
  </div>
</template>

<script>
import {computeImageUrl} from "~/utils/common";
import ProductMedia from "~/components/product/ProductMedia.vue";
import QuickProductDetail from "~/components/QuickProductDetail.vue";
import ProductMediaThumb from "~/components/product/ProductMediaThumb.vue";


export default {
  components: {ProductMediaThumb, QuickProductDetail, ProductMedia},
  data() {
    return {
      product: '',
      thumbIndex: 0,
    }
  },
  computed: {
    productSlug() {
      return this.$store.state.product.quickProductSlug;
    },
    images() {
      if (!this.product) {
        return [];
      }

      let thumbImage = [{
        variation_id: null,
        image_url: computeImageUrl(this.product.image)
      }];

      if (this.product.secondary_image) {
        thumbImage.push({
          variation_id: null,
          image_url: computeImageUrl(this.product.secondary_image)
        })
      }

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

      return [...thumbImage, ...galleryImages, ...variationImages];

    }
  },
  async fetch() {
    this.product = await this.$axios.$get('/products/' + this.productSlug);
  }
}
</script>
