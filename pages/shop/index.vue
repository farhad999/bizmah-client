<template>
  <div class="container-fluid">

    <BreadCrumb :items="breadCrumbItems"/>

    <hr/>

    <div class="row">
      <div class="col-12" v-if="category">
        <div class="px-md-2">
          <nuxt-img :src="computeImageUrl(category.banner_image)" alt="banner_image"
                    sizes="sm:100vw md:100vw xl:100vw"
                    class="w-100"
                    v-if="category.banner_image"
          />
        </div>
        <hr/>

        <h4 class="featured-section-title">{{ category.name }}</h4>

        <div class="shop-category-list mb-3">
          <div class="row">
            <div v-for="(cat, index) in category.children"
                 class="featured-category-item col-lg-3 col-md-3 col-sm-3 col-3"
                 :key="index"
            >
              <nuxt-link :to="`/category/${cat.slug}`">
                <div class="category-image-container">
                  <nuxt-img :src="computeImageUrl(cat.image)" alt="cat"
                            sizes="sm:200px"
                  />
                </div>
                <div class="category-title">{{ cat.name }}</div>
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>

      <div class="col-12 text-center py-4" v-if="search">
        <h4>Search Results For <strong>"{{ search }}"</strong></h4>
        <hr/>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-3 my-2">

        <!--Desktop -->
        <div>
          <div class="d-flex d-md-block justify-content-between align-items-center">
            <div>{{ pagination.total }} Products</div>
            <div class="filter-title">
              <i class="fa fa-arrow-up-short-wide"></i>Sort By:
            </div>
            <select class="product-sort" @change="onSortChange">
              <option v-for="(option, index) in sortOptions" :key="index" :value="option.value">
                {{ option.title }}
              </option>
            </select>
          </div>

          <div class="filter-title mt-4">
            <i class="fa fa-sliders"></i>
            Filter
          </div>

          <!--Filters-->
          <div class="d-flex align-items-center flex-wrap my-2">
            <!--variation filters-->
            <FilterChip @remove="removeVariation" :item="filter" v-for="filter in filters.variations" :key="filter.id"/>
          </div>

          <div class="d-flex d-md-block">
            <Disclosure v-for="filter in productFilters" :key="filter.id" :filter="filter"
                        :title="filter.name" :items="filter.values"
            />
          </div>

        </div>

        <!--Mobile-->


      </div>
      <div class="col-lg-9">
        <ProductList/>
      </div>
    </div>
  </div>

</template>

<script>

import ProductList from "../../components/ProductList.vue";
import {computeImageUrl} from "../../utils/common";
import Accordion from "../../components/Accordion.vue";
import Disclosure from "../../components/Disclosure.vue";
import FilterChip from "../../components/FilterChip.vue";
import search from "../../components/Navbar/Search.vue";
import BreadCrumb from "~/components/BreadCrumb.vue";

export default {
  components: {
    BreadCrumb,
    FilterChip,
    Disclosure,
    Accordion,
    ProductList,
  },
  data: function () {
    return {
      featuredProducts: [],
      categoryId: '',
      subCategoryId: '',
      subSubCategoryId: '',

      sortOptions: [{
        value: '',
        title: 'Latest',
      },
        {
          value: 'old',
          title: 'Old to New',
        },
        {
          value: 'name_asc',
          title: 'Alphabetically, A-Z',
        },
        {
          value: 'name_desc',
          title: 'Alphabetically, Z-A',
        },
        {
          value: 'price_asc',
          title: 'Price, Low to High'
        }, {
          value: 'price_desc',
          title: 'Price, High to Low',
        }],

    };
  },
  async fetch() {
    await this.getProducts();
    await this.$store.dispatch('product/getProductFilters')
  },
  watch: {
    '$route'(to, from) {
      if (to !== from) {
        console.log({to})
        this.applyParams(to.query, to.params);
        this.getProducts();
        //this.getFilters();
      }
    },
  },
  computed: {
    breadCrumbItems() {

      let {category, subCategory, subSubCategory} = this.$route.params;

      let items = [];

      let cat = this.$store.getters["product/getCategoryBySlug"](category)

      if(cat){
        items.push({
          text: cat.name,
          url: '/category/' + cat.slug
        })
      }

      if (!subCategory) {
        return items;
      }

      let subCat = this.$store.getters["product/getCategoryBySlug"](category, subCategory)

      if(subCat){
        items.push({
          text: subCat.name,
          url: `/category/${cat.slug}/${subCat.slug}`
        })
      }

      if (!subSubCategory) {
        return items;
      }

      let subSubCat = this.$store.getters["product/getCategoryBySlug"](category, subCategory, subSubCategory)

      items.push({
        text: subSubCat.name,
        url: '/category/' + subSubCat.slug
      })

      return items

    },
    categories: function () {
      return this.$store.state.product.categories;
    },
    /*brands() {
      return this.$store.state.product.allBrands;
    },*/
    category() {

      let {category, subCategory, subSubCategory} = this.$route.params;

      return this.$store.getters["product/getCategoryBySlug"](category)

      let cat = null;

      if (category) {
        cat = this.categories.find(item => item.slug === category)
        this.categoryId = cat?.id;
      }
      let subCat = null;
      if (cat && subCategory) {
        subCat = cat.children.find(item => item.slug === subCategory)
        this.subCategoryId = subCat?.id;
      }
      let subSubCat = null;
      if (subCat && subSubCategory) {
//if sub sub cat then we are in last stage
        subSubCat = subCat.children.find(item => item.slug === subSubCategory)
        this.subSubCategoryId = subSubCat?.id;
      }

      if (subSubCat) {
        return subSubCat;
      }

      if (subCat) {
        return subCat;
      }

      if (cat) {
        return cat;
      }

      return null;

    },
    brand() {
      let {brandSlug} = this.$route.params;
      return brandSlug || this.brands.find(item => item.slug === brandSlug);
    },
    search() {
      return this.$route.params.search;
    },
    pagination() {
      return this.$store.state.product.pagination;
    },
    productFilters() {
      return this.$store.state.product.productFilters;
    },
    filters() {
      return this.$store.state.product.filters;
    }
  },
  methods: {
    computeImageUrl,
    async getProducts() {
      await this.$store.dispatch('product/getProducts')
    },

    /*async getFilters() {
      await this.$store.dispatch('product/getFilters');
    },*/

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

      let {category, subCategory, subSubCategory, brandSlug, search} = this.$route.params;

      let params = {search};
      let cat = '';

      if (category) {
        cat = this.categories.find(item => item.slug === category)
        params.category = cat ? cat.id : '';
      }
      let subCat = null;
      if (cat && subCategory) {
        subCat = cat.children.find(item => item.slug === subCategory)
        params.subCategory = subCat ? subCat.id : '';
      }
      let subSubCat = null;
      if (subCat && subSubCategory) {
        subSubCat = subCat.children.find(item => item.slug === subSubCategory)
        params.subSubCategory = subSubCat ? subSubCat.id : '';
      }
      if (brandSlug) {
        let brand = this.brands.find(item => item.slug === brandSlug);
        params.brand = brand?.id;
      }

      this.$store.dispatch('product/applyParams', {params, query});
    },
    removeVariation(filter) {
      this.$store.dispatch('product/removeVariation', filter);
    }
  },
  created() {
    //console.log({route: this.$route});
    this.applyParams(this.$route.query);
  },
  mounted() {
    if (process.browser) {
      this.$fb.track('ViewContent')
    }
  }
};
</script>
