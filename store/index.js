import product from "@/store/modules/product";
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      product,
    }
  });
};

export default createStore;
