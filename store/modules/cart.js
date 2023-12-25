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

      const existingProduct = state.items.find((item) => item.variation_id === cartData.variation_id)
      if (existingProduct) {
        state.items.splice(state.items.indexOf(existingProduct), 1, cartData)
      }

      if (!existingProduct) {
        state.items.push(cartData)
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

      let products = value;

      state.items = state.items.filter(item => {
        return products.find((el) => el.id === item.product_id && el.visibility && el.variations.find((variation) => variation.id === item.variation_id));
      })

      state.cartProducts = value;
    }

  },
  actions: {
    async addToCart({dispatch, commit, rootState}, payload) {

      commit('ADD_TO_CART', payload)

      //push to server

      if (rootState.auth.loggedIn) {
        {
          await this.$axios.post('/carts', payload.cartData);
        }

        //await dispatch('getCartProducts')
        //await dispatch('postToSever')
      }
    },
    async removeFromCart({dispatch, commit, rootState}, payload) {
      commit('REMOVE_FROM_CART', payload)
      if (rootState.auth.loggedIn) {
        await this.$axios.$post('/remove-cart-item', {variation_id: payload.variation_id});
      }
    },
    async updateQuantity({dispatch, commit, rootState}, payload) {
      //console.log({payload})
      commit('SET_QUANTITY', payload)
      if (rootState.auth.loggedIn) {

        let data = {
          variation_id: payload.cart.variation_id,
          quantity: payload.quantity
        };

        await this.$axios.$post('/update-cart-quantity', data);
      }

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
    async getCartItems({commit}) {
      try {
        let data = await this.$axios.$get('/carts')
        let {carts, products} = data;
        commit("SET_CART", carts);
        commit("SET_CART_PRODUCTS", products);

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
