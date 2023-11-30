<template>
  <div class="cart-container">

    <BSidebar :visible="cartOpen" right @hidden="closeCart"
              no-header
              backdrop
              body-class="bg-white"
    >
      <div class="cart">
        <div class="cart-head">
          <div class="cart-item-count">
            <i class="fas fa-cart-arrow-down"></i>
            <span>{{ itemCount }} Items</span>
          </div>
          <button class="cart-close-btn" @click="$emit('closeCart')">
            Close
          </button>
        </div>
        <div class="cart-body">
          <div v-if="cartItems && cartItems.length">
            <CartItem v-for="(product,index) in cartItems"
                      :key="'cart-product-' + index"
                      :product="product"/>
          </div>
          <div v-else class="cart-empty">
            <i class="fas fa-shopping-cart"></i>
            <div class="text">Your Cart is Empty</div>
          </div>
        </div>
        <div class="cart-bottom" v-if="itemCount > 0">
          <hr/>
          <div class="cart-total">
            <div class="title">Total</div>
            <div class="price">{{ totalPrice | priceFormat }}</div>
          </div>

          <div class="mb-3">
            <a class="dark-btn d-block" href="javascript:void(0)" @click="gotoCheckOut">
              Checkout
            </a>
          </div>
        </div>
      </div>
    </BSidebar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartItem from "./CartItem.vue";

export default {
  components: {CartItem},
  props: {
    cartOpen: Boolean,
  },
  computed: {
    ...mapGetters('cart', ['cartItems', 'itemCount', 'totalPrice'])
  },
  methods: {
    gotoCheckOut() {

      if (this.itemCount === 0) {
        this.$toast.error('Add some products to cart to checkout');
        return;
      }

      this.$emit('closeCart')
      this.$router.push('/checkout')
    },
    closeCart() {
      this.$emit('closeCart')
    }
  }
}
</script>
