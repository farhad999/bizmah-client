<template>
  <div>
    <h5 class="product-title">{{ product.name }}</h5>

    <div class="price-box my-2">
      <div v-if="selectedProductVariant">
        <span class="old-price">{{ selectedProductVariant.old_price | priceFormat }}</span>
        <span class="new-price">{{ selectedProductVariant.price | priceFormat }}</span>
      </div>

      <div v-else>
        <span class="old-price">{{ prices[2] | priceFormat }}</span>
        <span class="new-price">{{ prices[0] | priceFormat }}</span>
      </div>

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
    <div class="d-flex align-items-center">
      <div class="mr-2">
        <ProductQuantityInput :qty="qty"/>
      </div>
      <div>
        <button class="add-to-cart-btn px-4" @click="addCart">Add To Cart</button>
      </div>
    </div>

  </div>

</template>

<script>


import ProductQuantityInput from "~/components/product/ProductQuantityInput.vue";
import {computePrice, computeVariantPrice} from "~/utils/common";

export default {
  components: {
    ProductQuantityInput
  },
  props: {
    product: Object,
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
