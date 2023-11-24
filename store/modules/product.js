export default {
  namespaced: true,

  state: function () {
    return {
      categories: [],
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
    SET_FILTERED_PRODUCTS(state, val) {
      state.filteredProducts = val;
    },

  },
  actions: {
    async getCategories({commit}) {
      try {

        //console.log({axios: this.$axios})

        const data = await this.$axios.$get('/categories');
        commit('SET_CATEGORIES', data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
