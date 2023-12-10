export default {
  namespaced: true,

  state: function () {
    return {
      categories: [],
      productList: [],
      newArrivals: {
        products: [],
        loading: false,
        pagination: {
          page: 1,
          perPage: 12,
        },
        hasMore: true,
      },
      pagination: {
        page: 1,
        perPage: 12,
        total: 0,
      },
      filters: {
        category: '',
        price: '',
        variations: [],
        search: '',
      },
      productFilters: [],
      quickProduct: '',
      quickViewModal: false,
      quickProductSlug: '',
    };
  },
  getters: {
    getCategoryBySlug(state) {
      return (slug, subCat = null, subSubCat = null) => {

        let categories = state.categories;

        let category = categories.find((cat) => {
          return cat.slug === slug;
        });

        let subCategory = null;

        if (subCat && category) {
          subCategory = category.children.find((cat) => {
            return cat.slug === subCat;
          });
        }

        let subSubCategory = null;
        if (subSubCat && subCategory) {
          subSubCategory = subCategory.children.find((cat) => {
            return cat.slug === subSubCat;
          });

        }

        if (subSubCat) {
          return subSubCategory;
        }
        if (subCat) {
          return subCategory;
        }

        return category;

      };
    },
  },
  mutations: {
    SET_CATEGORIES(state, val) {
      state.categories = val;
    },
    SET_PRODUCTS(state, val) {
      state.productList = val;
    },

    SET_NEW_ARRIVAL_PRODUCTS(state, val) {
      state.newArrivals.products = [...state.newArrivals.products, ...val];
    },

    SET_PAGINATION(state, val) {
      state.pagination = {...state.pagination, ...val};
    },
    SET_PRODUCT_FILTERS(state, val) {
      state.productFilters = val;
    }

  },
  actions: {
    async getCategories({commit}) {
      try {
        const data = await this.$axios.$get('/featured-categories');
        commit('SET_CATEGORIES', data);
      } catch (err) {
        console.log(err);
      }
    },
    async getProducts({state, commit}) {
      try {

        state.loading = true;

        let params = {};

        if (state.filters.price && state.filters.price.length) {
          let prices = state.filters.price.split('-')
          params.min_price = prices[0];
          params.max_price = prices[1];
        }

        //sort

        if (state.sortBy && state.sortBy.length) {
          params.sort = state.sortBy;
        }

        if (state.category) {
          params.category_id = state.category;
        }

        if (state.subCategory) {
          params.sub_category_id = state.subCategory;
        }

        if (state.subSubCategory) {
          params.sub_sub_category_id = state.subSubCategory;
        }

        if (state.pagination) {
          params.per_page = state.pagination.perPage;
          params.page = state.pagination.page;
        }

        if (state.filters.search && state.filters.search.length) {
          params.search_term = state.filters.search;
        }

        if (state.brand) {
          params.brand_id = state.brand;
        }

        //variations

        if (state.filters.variations && state.filters.variations.length) {
          params.variation_templates = [...new Set(state.filters.variations.map(item => item.template))].join(',');
          params.variation_values = state.filters.variations.map(item => item.value).join(',');
        }

        const data = await this.$axios.$get('/products', {params});

        state.loading = false;

        let productData = data.data || [];

        let {total} = data;

        commit("SET_PRODUCTS", productData)

        commit('SET_PAGINATION', {total});

      } catch (err) {
        console.log(err);
      }
    },
    async getNewArrivals({commit, state}) {

      try {

        if (!state.newArrivals.hasMore) {
          return;
        }

        state.newArrivals.loading = true;
        let params = {
          per_page: state.newArrivals.pagination.perPage,
          page: state.newArrivals.pagination.page,
        }


        const data = await this.$axios.$get('/new-arrivals', {params});

        state.newArrivals.loading = false;

        state.newArrivals.hasMore = !!data.next_page_url;

        state.newArrivals.pagination.page = state.newArrivals.pagination.page + 1

        let productData = data.data || [];


        //let {total} = data;

        commit("SET_NEW_ARRIVAL_PRODUCTS", productData)

        //commit('SET_PAGINATION', {total});

      } catch (err) {
        console.log(err);
      }
    },

    applyParams({state, dispatch, commit}, payload) {

      let {query, params} = payload;

      //filter if required

      //let category = query.category || '';

      if (params) {
        state.category = params.category || null;
        state.subCategory = params.subCategory || null;
        state.subSubCategory = params.subSubCategory || null;
        state.brand = params.brand || null;
      }

      if (query) {

        state.filters.price = query.price || '';

        //variation

        let variation = query.variation || '';

        state.filters.search = query.search;

        //dispatch('filterProducts', {category, price, search, variation})
        //sort
        state.sortBy = query.sort || '';
        //dispatch('sortProducts', sort)
        //pagination
        state.pagination.page = query.page || 1;

        state.pagination.perPage = query.per_page || 12;

        /*commit('SET_PAGINATION', {page, perPage})
        dispatch('paginateProducts')*/
      }
    },

    selectVariation({state}, variation) {
      state.selectedVariation = variation;
    },
    async getProductFilters({commit}) {
      try {
        let data = await this.$axios.$get('/product-filters');
        commit('SET_PRODUCT_FILTERS', data)
      } catch (e) {
        console.log(e)
      }
    },

    applyVariation({state, dispatch, commit}, payload) {

      let variations = state.filters.variations;

      //let index =  variations.find(item => item.template == payload.template);

      let index = variations.findIndex(item => item.template === payload.template
        && item.value === payload.value
      );

      console.log({index})

      //then remove this variation
      if (index > -1) {

        variations.splice(index, 1);

      } else {
        variations = [...variations, payload];
      }

      state.filters.variations = variations;

      /*if (!exist) {
        state.filters.variations = [...variations, payload];
      } else {
        exist.value = [...exist.value, payload.value];
      }*/

      dispatch('getProducts')
    },

    removeVariation({state, dispatch, commit}, payload) {
      //find and remove
      let variations = state.filters.variations;
      let index = variations.findIndex(item => item.template === payload.template
        && item.value === payload.value
      );

      if (index > -1) {
        variations.splice(index, 1);
        state.filters.variations = variations;
        dispatch('getProducts')
      }

    },
    openQuickView({state}, payload) {
      state.quickViewModal = true;
      state.quickProductSlug = payload.slug;
    },

    closeQuickView({state}) {
      state.quickViewModal = false;
    }

  },
};
