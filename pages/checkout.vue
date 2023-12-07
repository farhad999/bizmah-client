<template>
  <main>
    <div class="container checkout-container my-3">

      <template v-if="cartItems.length">
        <div class="row">
          <div class="col-lg-6">

            <!--- Addresses -->

            <h5 class="step-title">Shipping Address</h5>

            <template v-if="userAddresses.length">
              <v-select
                v-model="selectedAddress"
                :options="userAddresses"
                :reduce="address => address.id"
              />
            </template>

            <div class="card">
              <div class="card-body">
                <CheckoutAddressForm :address.sync="address"/>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <div style="font-size: 16px">YOUR ORDER</div>
              </div>
              <div class="card-body">
                <div>
                  <h6>Products</h6>
                  <hr/>
                  <div v-if="cartItems.length > 0">
                    <div
                      v-for="(product, index) in cartItems"
                      :key="'cart-product-' + index"
                      class="d-flex justify-content-between mb-2"
                    >
                      <CartItem :product="product"/>
                    </div>
                  </div>

                  <hr class="my-3"/>

                  <div class="d-flex justify-content-between">
                    <div class="font-weight-bold">Subtotal</div>
                    <div class="price">
                      {{ totalPrice | priceFormat }}
                    </div>
                  </div>

                  <div class="mt-2 order-shipping">
                    <div>
                      <h6>Shipping</h6>
                      <div>
                        <div>
                          <label class="form-label">
                            <input
                              type="radio"
                              name="delivered_to"
                              v-model="deliveredTo"
                              value="inside_dhaka"
                            />
                            Inside Dhaka</label>
                        </div>
                      </div>

                      <div>
                        <label class="form-label">
                          <input
                            type="radio"
                            name="delivered_to"
                            v-model="deliveredTo"
                            value="outside_dhaka"
                          />
                          Outside Dhaka</label>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div class="d-flex justify-content-between">
                    <h6 class="font-weight-bold text-14">Shipping Charge</h6>
                    <div class="price">{{ shippingCharge | priceFormat }}</div>
                  </div>
                </div>

                <hr/>

                <div class="d-flex justify-content-between mt-2">
                  <h6 class="font-weight-bold font-14">Total</h6>
                  <div class="total-price">
                    <span class="price">{{ totalAmount | priceFormat }}</span>
                  </div>
                </div>

                <button
                  @click="placeOrder"
                  class="btn btn-block btn-secondary mt-3"
                  form="checkout-form"
                  type="button"
                  :disabled="!cartItems.length"
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="card my-2" v-else>
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
          <h4>Cart is Empty</h4>
          <p>Add Some Product to Checkout</p>
          <nuxt-link to="/shop" class="btn btn-primary mt-2">Continue Shopping</nuxt-link>
        </div>
      </div>
    </div>

    <!-- Force User to set profile name -->

    <div v-if="user">
      <BModal title="Complete Profile" v-model="showCompleteProfileModal" hide-footer
              :disableClose="true"
              no-close-on-backdrop
              no-close-on-esc
              hide-header-close

      >
        <CompleteProfile @callback="showCompleteProfileModal = false"/>
      </BModal>
    </div>

  </main>
</template>

<script>
import {mapGetters} from 'vuex';
import CompleteProfile from "~/components/CompleteProfile.vue";
import CartItem from "~/components/cart/CartItem.vue";
import CheckoutAddressForm from "~/components/CheckoutAddressForm.vue";

export default {
  components: {CartItem, CheckoutAddressForm, CompleteProfile},
  data: function () {
    return {
      loginOpened: false,
      codeOpened: false,
      accountOpened: false,
      addressOpened: false,
      deliveredTo: 'inside_dhaka',
      selectedAddress: '',
      //address
      address: {
        customer_name: '',
        customer_mobile: '',
        customer_address: '',
        customer_city: '',
        customer_zone: '',
        address_id: null,
      },
      selectedPayment: 'cod',
      deliveryCharge: 0,
      couponCode: '',
      couponApplied: '',
      showCompleteProfileModal: false,
    };
  },
  watch: {
    selectedAddress: function (value) {
      if (value) {

        //find the address

        let add = this.user.addresses.find((address) => {
          return address.id === value;
        });

        this.address.address_id = value;
        this.address.customer_address = add.address;
        this.address.customer_city = add.city;
        this.address.customer_zone = add.zone;
        this.address.customer_name = add.customer_name;
        this.address.customer_mobile = add.mobile;
      }
    }
  },
  computed: {
    ...mapGetters('cart', [
      'cartItems',
      'itemCount',
      'totalPrice',
    ]),
    settings() {
      return this.$store.state.common.settings;
    },
    user() {
      let user = this.$store.state.auth.user;
      this.selectedAddress = user && user.addresses[0]?.id;
      return user;
    },
    userAddresses() {
      if (this.$auth.loggedIn) {
        return this.user.addresses.map((address) => {
          return {
            id: address.id,
            label: `${address.city}-${address.zone}, ${address.address}`,
          }
        });
      }
      return [];
    },
    shippingCharge() {
      if (this.deliveredTo === 'inside_dhaka') {
        return parseInt(this.settings.shipping_charge_inside_dhaka || 0);
      } else if (this.deliveredTo === 'outside_dhaka') {
        return parseInt(this.settings.shipping_charge_outside_dhaka || 0);
      } else {
        return 0;
      }
    },
    totalAmount() {
      return (
        this.totalPrice +
        this.shippingCharge
      );
    },
  },
  methods: {
    async placeOrder() {
      this.loading = true;

      if (!this.$auth.loggedIn) {
        //save address
        localStorage.setItem('address', JSON.stringify(this.address));
      }

      let payloadData = {
        ...this.address,
        address_id: this.selectedAddress ?? null,
        items: this.cartItems.map((item) => ({
          product_id: item.id,
          variation_id: item.variation_id,
          quantity: item.quantity,
        })),
        delivered_to: this.deliveredTo,
        shipping_note: '',
        source: 'website',
        payment_method: this.selectedPayment,
      };

      try {
        let data = await this.$axios.$post(`/orders`, payloadData);

        if (data.status === 'success') {

          //order successful
          this.$toast.success(data.message);
          await this.$store.dispatch('cart/removeAll')

          if (data.user_info_updated) {
            //then refetch user data
            await this.$auth.fetchUser();
          }

          await this.$router.replace({path: '/order-success', query: {order_no: data.order_no}});
        }

      } catch (err) {

        this.loading = false;

        this.message = err.message;

        this.$toast.error(this.message);
      }
    },

  },
  mounted() {
    if (!this.$auth.loggedIn) {
      //add address from local storage
      //address is stored in local storage
      if (localStorage.getItem('address')) {
        this.address = JSON.parse(localStorage.getItem('address'));
      }
    }
  }
};
</script>

<style lang="scss">
.card-address {
  display: flex;
  justify-content: space-between;
  border: 2px solid #eae4e4;
  margin: 5px 0;
  align-items: center;
  padding: 15px 5px;
  transition: 0.5s all ease-in-out;
  width: 100%;

  &:hover {
    background-color: #fdfdfd;
    cursor: pointer;
  }
}

.active-address {
  i {
    color: #c40c90;
  }

  border: 2px solid #c40c99;
}

hr {
  margin: 5px 0 !important;
}
</style>
