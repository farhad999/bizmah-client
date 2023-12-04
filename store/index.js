import product from "@/store/modules/product";
import cart from "@/store/modules/cart";
import common from "~/store/modules/common";
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      product,
      cart,
      common
    }
  });
};

export default createStore;
