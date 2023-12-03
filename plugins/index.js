import Vue from 'vue'
import VueAwesomeSwiper from "vue-awesome-swiper";
//import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css';
import 'vue-select/dist/vue-select.css';
import vSelect from "vue-select";

Vue.use(VueAwesomeSwiper)
//Vue.use(Toast)
Vue.component('v-select', vSelect);
