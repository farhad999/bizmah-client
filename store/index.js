import product from "@/store/modules/product";
import cart from "@/store/modules/cart";
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      product,
      cart
    }
  });
};

export default createStore;
