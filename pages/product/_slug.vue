<template>
  <div>

    <div class="page-container product-view">

      <div class="row">
        <div class="col-12 mt-2 mb-4">
<!--          <div>
            <nuxt-link to="/">Home</nuxt-link>
            <span class="mx-2">
            <i class="fa fa-chevron-right"></i>
          </span>
            <span>{{ this.product.name }}</span>
          </div>-->

          <BreadCrumb :items="breadCrumbItems"/>

        </div>

        <div class="col-lg-4">
          <div class="d-none d-lg-block">
            <ProductMediaThumb
                :images="images" :product="product" direction="left"
                @onThumbClick="(index)=>thumbIndex = index"
                :loading="loading"
            />
          </div>
          <div class="d-none d-lg-block">
            <ProductDescription :product="product"
                                :loading="loading"
            />
          </div>
        </div>

        <div class="col-lg-4">
          <ProductMedia
              :product="product"
              :images="images"
              :thumbIndex="thumbIndex"
              @onThumbClick="(index)=>thumbIndex=index"
              :loading="loading"
          />
        </div>

        <div class="col-lg-4">
          <ProductDetail
              :product="product"
              :loading="loading"
          />
        </div>
        <div class="d-lg-none col-12">
          <ProductDescription :product="product"
                              :loading="loading"
          />
        </div>

      </div>

      <hr/>
    </div>

    <div class="page-container">
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
import {computeImageUrl, computePrice} from "../../utils/common";
import ProductCard from "~/components/ProductCard.vue";
import BreadCrumb from "~/components/BreadCrumb.vue";

export default {
  components: {BreadCrumb, ProductCard, ProductDescription, ProductMediaThumb, ProductMedia, ProductDetail},
  head() {
    return {
      title: this.product.name,
      meta: [{
        name: 'og:title',
        hid: 'title',
        content: this.product.name,
      }, {
        hid: 'description',
        name: 'description',
        content: this.product.short_description,
      },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.product.short_description,
        },
        {
          hid: 'image',
          name: 'og:image',
          property: 'og:image',
          content: computeImageUrl(this.product.image)
        }
      ]
    }
  },
  data() {
    return {
      product: '',
      thumbIndex: 0,
      relatedProducts: [],
      loading: true,
    }
  },
  computed: {
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

      return [...thumbImage, ...variationImages, ...galleryImages];
    },
    breadCrumbItems() {
      let items = [];
      if (this.product) {

        let {category, sub_category, sub_sub_category} = this.product;

        if (category) {
          items.push({
            text: category.name,
            url: `/category/${category.slug}`
          })
        }
        if (sub_category) {
          items.push({
            text: sub_category.name,
            url: `/category/${category.slug}/${sub_category.slug}`
          })
        }
        if (sub_sub_category) {
          items.push({
            text: sub_sub_category.name,
            url: `/category/${category.slug}/${sub_category.slug}/${sub_sub_category.slug}`
          })
        }
      }

      if (this.product) {
        items.push({
          text: this.product.name,
          url: '/product/' + this.product.slug
        })
      }

      return items;
    }
  },
  async fetch() {
    let slug = this.$route.params.slug;
    try {
      this.loading = true
      this.product = await this.$axios.$get('/products/' + slug);
      this.loading = false;
      this.relatedProducts = await this.$axios.$get('/get-related-products/' + slug)
    } catch (e) {

    }
  },
  mounted() {
    if (process.browser) {
      this.$fb.track('ViewContent', {
        content_type: 'product',
        content_id: this.product.id,
        content_name: this.product.name,
        currency: 'BDT',
        value: computePrice(this.product)[0] ?? 0,
      })
    }
  }
}
</script>
