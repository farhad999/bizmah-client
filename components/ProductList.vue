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
    </template>
    <div class="col-12" v-else>
      <div class="py-5">
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
    return {}
  },
  methods: {
    showSidebarFilter: function () {
      document.querySelector('body').classList.add('sidebar-opened');
    },
    changePerPage: function (ev) {

      let perPage = ev.target.value;
      //this.$store.dispatch('product/updatePagination', {perPage})
      //reset pagination to 1
      this.$router.push({
        ...this.$route, query: {...this.$route.query, page: 1, per_page: perPage}
      })
    },
    onPageChange(value) {
      //console.log('on change page');
      //this.$store.dispatch('product/updatePagination', {page: value})
    },
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
    toggleSidebar: function () {
      let body = document.querySelector('body');
      if (body.classList.contains('sidebar-opened')) {
        body.classList.remove('sidebar-opened');
      } else {
        body.classList.add('sidebar-opened');
      }
    },
    removeFilter(key) {

      console.log("clear all")
      console.log({key})
      let query = {...this.$route.query};
      if (key) {
        delete query[key];
      } else {
        query = {};
      }

      console.log({query})

      this.$router.push({
        path: this.$route.path,
        query: {
          ...query,
          page: 1,
        }
      })
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
    }

  }
}
</script>
