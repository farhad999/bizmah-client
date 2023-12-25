<template>
  <div>
    <div class="d-flex justify-content-end">
      <button class="back-button">
        <i class="fa fa-reply" @click="$router.go(-1)"></i>
      </button>
    </div>

    <div v-if="product && !loading">
      <h5 v-if="!loading" class="product-title">{{ product.name }}</h5>


      <div class="price-box my-2">
        <div v-if="selectedProductVariant">
          <span class="old-price"
                v-if="selectedProductVariant.old_price">{{ selectedProductVariant.old_price | priceFormat }}</span>
          <span class="new-price">{{ selectedProductVariant.price | priceFormat }}</span>
        </div>

        <div v-else>
          <span class="old-price" v-if="prices[2]">{{ prices[2] | priceFormat }}</span>
          <span class="new-price">{{ prices[0] | priceFormat }}</span>
        </div>

      </div>

      <!-- Short Description -->

      <div v-if="product.short_description" class="pb-2">
        <p>
          {{ product.short_description }}
        </p>
      </div>

      <div
        class="variation-container"
        v-if="product.variations.length > 0"
      >
        <div
          :key="index"
          class="variation-list"
          v-for="(variation, index) in variations"
        >
          <div class="variation-title">{{ variation.key }}:</div>
          <div class="variation-values">
            <div
              v-for="(item, index) in variation.values"
              :key="'variant' + index"
              @click="() => onClickVariation(variation.key, item)"
              class="variant"
              :class="[
                            isVariationActive(variation.key, item)
                                ? 'active'
                                : '',
                        ]"
            >
              <a
                class="d-flex justify-content-center align-items-center text-uppercase"
                href="javascript:void(0)"
              >{{ item }}</a
              >
            </div>
          </div>
        </div>

      </div>

    </div>

    <div v-else>
      <div class="skeleton w-80 h-20 mb-2"></div>
      <div class="skeleton w-30 h-14 mb-2"></div>

      <div class="skeleton line w-100 mb-1"></div>
      <div class="skeleton line w-50 mb-1"></div>

      <div class="skeleton w-20 h-18 mb-2"></div>

      <div class="d-flex">
        <div v-for="(i, index) in [1, 2, 3]"
             class="skeleton w-20 h-16 mr-1"
        ></div>
      </div>


    </div>

    <div class="d-flex justify-content-between align-items-end">
      <div>
        <div class="variation-title">Quantity:</div>
        <ProductQuantityInput :qty="qty"/>
      </div>
      <!--Share -->
      <div class="d-flex align-items-center py-1">
        <div class="mr-3">
          <i class="fa fa-heart"></i>
          Wishlist
        </div>
        <div class="mr-3">
          <i class="fa fa-share-alt"></i>
          Share
        </div>
      </div>
    </div>

    <div class="mt-2">
      <button class="add-to-cart-btn" @click="addCart">Add To Cart</button>
    </div>

    <div>
      <Accordion title="Care Instructions">
        Wash light and bright colors separately. Do not bleach. Do not twist/wring, warm iron to sequined, beaded, and
        delicate fabrics. Do not dry in direct sunlight.
      </Accordion>
      <Accordion title="Disclaimer">
        Actual colors of the product may vary from the colors being displayed on your device.
      </Accordion>
    </div>

  </div>

</template>

<script>


import ProductQuantityInput from "./ProductQuantityInput.vue";
import {computePrice, computeVariantPrice} from "../../utils/common";
import Accordion from "../Accordion.vue";

export default {
  components: {
    Accordion,
    ProductQuantityInput
  },
  props: {
    product: Object,
    loading: {
      type: Boolean,
      default: false,
    }
  },
  data: function () {
    return {
      minPrice: 0,
      maxPrice: 0,
      qty: 1,
      selectedVariant: '',
      isShare: {
        type: Boolean,
        default: true,
      },
      url: process.env.APP_URL + this.$route.fullPath,
      activeAccordion: '',
    };
  },
  watch: {
    selectedVariant: function () {
      this.$store.dispatch('product/selectVariation', this.selectedProductVariant)
    }
  },
  computed: {
    /*category() {
      return this.$store.getters["product/getCategoryById"](this.product.category_id)
    },*/
    variations: function () {
      if (this.product.type === 'single') {
        return [];
      }

      const v = String(this.product.template)
        .split('|')
        .map((item) => ({
          key: item,
          values: [],
        }));

      //now traverse variations

      this.product.variations.forEach((pv) => {
        pv.name.split('|').forEach((item, index) => {
          if (!v[index].values.includes(item))
            v[index].values.push(item);
        });
      });

      return v;
    },

    isRequiredVariationSelected() {
      if (this.product.type === 'single') {
        return true;
      }
      return (
        this.product.template.split('|').length ===
        Object.keys(this.selectedVariant).length
      );
    },
    selectedProductVariant() {
      if (this.product.type === 'single') {
        return this.product.variations[0];
      }
      return this.product.variations.find((item) => {
        return Object.values(this.selectedVariant).sort().join(',') ===
          item.name.split('|').sort().join(',')
      })

    },

    prices() {
      return computePrice(this.product)
    }
  },
  methods: {
    computeVariantPrice,
    addCart: function () {

      if (!this.selectedProductVariant) {
        this.$toast.error("Please select variation");
        return;
      }

      let cartData = {
        product_id: this.product.id,
        variation_id: this.selectedProductVariant.id,
        quantity: this.qty,
      };

      this.$fb.track('AddToCart', {
        content_name: this.product.name,
        content_id: this.product.id,
        content_type: 'product',
        value: this.selectedProductVariant.price,
        currency: 'BDT',
      })

      this.$store.dispatch('cart/addToCart', {cartData, product: this.product});

      this.$toast("Product added to cart");
    },
    onClickVariation(key, variant) {
      this.selectedVariant = {...this.selectedVariant, [key]: variant};
    },
    isVariationActive(key, variant) {
      return this.selectedVariant[key] === variant;
    },
    resetValue() {
      this.selectedVariant = '';
    },
    changeQty: function (quantity) {
      this.qty = quantity;
    },

  },
};
</script>
