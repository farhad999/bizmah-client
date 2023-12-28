<template>

  <div class="row">
    <template v-if="products.length">
      <div v-for="product in products"
           :key="product"
           class="col-md-3 col-sm-4 col-6"
      >
        <ProductCard
          :product="product"
        />
      </div>

      <div v-if="hasMore" class="col-12 d-flex justify-content-center my-4">
        <button class="dark-btn" @click="loadMore">
          <span v-if="!loading">Load More</span>
          <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>
      </div>

    </template>
    <div class="col-12" v-else>

      <template v-if="loading && products.length === 0">
        <div class="row">
          <div
            class="col-6 col-sm-4 col-md-3 mb-3"
            v-for="(item, index) in repeatCount.slice(0, pagination.perPage)"
            :key="'skel-shop' + index"
          >
            <div class="product-card">
              <div class="skeleton mb-2" style="width: 100%; aspect-ratio: 1"></div>
              <div class="skeleton mb-1 line w-80"></div>
              <div class="skeleton mb-1 line w-60"></div>
              <div class="skeleton mb-1 line w-70"></div>
            </div>
          </div>
        </div>
      </template>

      <div class="py-5" v-else>
        <div class="text-center font-visby-bold text-18">No Products Found</div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  components: {ProductCard},
  watch: {
    '$route.query':
      function (val) {
        let filters = {};
        filters.category = this.$route.query.category || '';
      },
  },
  data() {
    return {
      repeatCount: new Array(50),
    }
  },
  methods: {
    onSortChange(event) {
      let value = event.target.value;

      let query = {...this.$route.query, sort: value, page: 1};

      if (!value) {
        delete query.sort;
      }

      this.$router.push({
        ...this.$route,
        query,
      });
    },
    applyParams(query) {
      this.$store.dispatch('product/applyParams', query);
    },
    loadMore() {
      this.$store.dispatch('product/loadMore');
    }
  },
  computed: {

    products() {
      return this.$store.state.product.productList;
    },
    pagination() {
      return this.$store.state.product.pagination;
    },
    list() {
      return this.$route.query.list;
    },
    filters() {
      return this.$store.state.product.filters;
    },
    sortBy() {
      return this.$store.state.product.sortBy;
    },
    filterParams() {
      return {
        query: this.$route.query,
      }
    },
    variations() {
      return this.$store.state.product.variations
    },
    loading() {
      return this.$store.state.product.loading;
    },
    category() {
      let {category, subCategory, subSubCategory} = this.$route.params;
      return this.$store.getters["product/getCategoryBySlug"](category, subCategory, subSubCategory)
    },
    hasMore() {
      return this.$store.state.product.hasMoreProducts;
    }

  }
}
</script>
