import {computeImageUrl, computeVariantPrice} from "~/utils/common";

export default {
  namespaced: true,
  state: function () {
    return {
      items: [],
      cartProducts: [],
    }
  },
  getters: {
    cartItems: function (state) {

      //return [];

      let products = state.cartProducts;

      return state.items.map((item) => {

        const product = products && products.find((el) => el.id === item.product_id)

        const variation = product && product.variations.find((el) => el.id === item.variation_id)

        const price = computeVariantPrice(variation, product)

        //return cart products
        return {
          id: product && product.id,
          name: product && product.name,
          slug: product && product.slug,
          type: product && product.type,
          image: product && computeImageUrl(product.image),
          variation_template: product && product.template,
          variation_id: item.variation_id,
          variation: (product && product.type === 'variable') ? product.template.split('|').map((item, index) => item + ': ' + variation.name.split('|')[index]).join(', ') : '',
          quantity: item.quantity,
          price,
        }
      })

    },
    itemCount: function (state) {
      return state.items.length;
    },
    totalPrice: function (state, getters) {
      let cartProducts = getters.cartItems;
      return cartProducts.reduce((total, item) => {
        total += Number(item.price) * item.quantity;
        return total;
      }, 0)
    },
  },
  mutations: {
    SET_CART: function (state, val) {
      state.items = val;
    },
    ADD_TO_CART: function (state, val) {

      let {cartData, product} = val

      if (!state.items.length) {
        state.items.push(cartData)
      } else {
        const existingProduct = state.items.find((item) => item.variation_id === cartData.variation_id)
        if (existingProduct) {
          state.items.splice(state.items.indexOf(existingProduct), 1, cartData)
        } else {
          state.items.push(cartData)
        }
      }

      state.cartProducts.push(product)

    },
    REMOVE_FROM_CART: function (state, payload) {
      state.items = state.items.filter(item => item.variation_id !== payload.variation_id);
    },
    SET_QUANTITY: function (state, payload) {

      let {cart, quantity} = payload;

      const item = state.items.find((item) => item.variation_id === cart.variation_id)

      //console.log({state, cart, item, varId: cart.variationId})

      item.quantity = quantity;
    },
    SET_CART_PRODUCTS: function (state, value) {
      state.cartProducts = value;
    }

  },
  actions: {
    async addToCart({dispatch, commit}, payload) {
      commit('ADD_TO_CART', payload)
      //await dispatch('getCartProducts')
      await dispatch('postToSever')
    },
    removeFromCart({dispatch, commit}, payload) {
      commit('REMOVE_FROM_CART', payload)
      dispatch('postToSever')
    },
    updateQuantity({dispatch, commit}, payload) {
      //console.log({payload})
      commit('SET_QUANTITY', payload)
      dispatch('postToSever')
    },
    async getCartProducts({state, commit}) {

      let params = {per_page: 100};

      //console.log({items: state.items})

      let ids = state.items.map(item => (item.product_id));

      if (ids) {
        params.ids = ids.join(',');
      }

      let data = await this.$axios.$get('/cart-products', {params});
      commit('SET_CART_PRODUCTS', data)
    },
    async getCartItems({state, commit}) {
      try {
        let data = await this.$axios.$get('/cart-items')
        let {cart, products} = data;

        console.log({cart, products, data})

        commit("SET_CART", cart);
        commit("SET_CART_PRODUCTS", products);

      } catch (e) {

      }
    },
    async postToSever({state, commit, rootState}) {
      try {
        let cart = state.items;
        if (rootState.auth.user) {
          await this.$axios.post('/cart-items', {cart})
        }
      } catch (e) {

      }
    },
    async sync({state, commit}) {
      try {

        let data = await this.$axios.$get('/cart-items')
        let {cart} = data;

        const mergedArray = [...cart, ...state.items];

        if (mergedArray.length) {
          let mergedItems = [];
          mergedArray.forEach(item => {
            let existingItem = mergedItems.find(i => i.variation_id === item.variation_id);
            if (existingItem) {
              existingItem.quantity = existingItem.quantity + item.quantity;
            } else {
              mergedItems.push(item)
            }
          })
          commit('SET_CART', mergedItems)
        }

      } catch (e) {

      }
    },
    removeAll({commit}) {
      commit('SET_CART', []);
    }
  }
}
