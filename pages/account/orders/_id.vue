<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12 my-3">
        <ul class="account-breadcrumb">
          <li><a href="/" class="nuxt-link-active"><i class="fa fa-home"></i></a></li>
          <li>/</li>
          <li>
            <nuxt-link to="/account" aria-current="page">Account
            </nuxt-link>
          </li>
          <li>/</li>
          <li>
            <nuxt-link to="/account/orders" aria-current="page">My Orders
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-body">

        <h4>
          <i class="fa fa-shopping-bag align-middle mr-3"></i>Order Details
        </h4>

        <div v-if="loading">
          <span class="spinner-border"></span>
        </div>
        <div v-else>
          <div v-if="order">
            <div class="row">
              <div class="col-md-6 border py-3">
                <strong>Order No.: </strong> {{ order.order_no }}
              </div>
              <div class="col-md-6 border py-3">
                <strong>Date: </strong> {{ order.date }}
              </div>
              <div class="col-md-6 border py-3">
                <strong>Shipping Status: </strong> {{ order.shipping_status }}
              </div>
              <div class="col-md-6 border py-3">
                <strong>Payment Method: </strong> {{ order.payment_method }}
              </div>
              <div class="col-md-6 border py-3">
                <strong>Total: </strong> {{ order.total_amount }}
              </div>
              <div class="col-12 border py-3">
                <strong>Shipping Address: </strong> {{ order.shipping_address }}
              </div>
            </div>

            <h4 class="mt-2">Products</h4>
            <table class="table table-bordered">
              <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              </thead>
              <tbody>
              <tr :key="index" v-for="(orderItem, index) in order.items">
                <td style="width: 100px">
                  <img :src="computeImageUrl(orderItem.product.image)"
                       alt="image"
                       style="width: 100%; height: 60px"
                  />
                </td>
                <td>
                  <h6>{{ orderItem.product.name }}</h6>
                  <p v-if="orderItem.product.type === 'variable'">
                    {{ getVariation(orderItem.product, orderItem.variation) }}</p>
                </td>
                <td>{{ orderItem.quantity }}</td>
                <td class="font-weight-bold">{{ orderItem.price | priceFormat }}</td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td>Sub Total</td>
                <td class="font-weight-bold">{{ order.subtotal | priceFormat }}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>Shipping Charge</td>
                <td class="font-weight-bold">{{ order.shipping_charge | priceFormat }}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>Total Amount</td>
                <td class="font-weight-bold">{{ order.total_amount | priceFormat }}</td>
              </tr>
              </tfoot>
            </table>

          </div>
          <div v-else class="py-3 text-center">
            <div class="text-18">Order Not Found</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {BFormRating} from "bootstrap-vue";
import {computeImageUrl} from "~/utils/common";

export default {
  components: {BFormRating},
  data() {
    return {
      order: '',
      reviewModal: false,
      reviewData: {
        rate: '',
        review: '',
      },
      selectedItem: '',
      orderId: this.$route.params.id,
      loading: false,
    }
  },
  async fetch() {
    let id = this.$route.params.id;
    this.loading = true;
    this.order = await this.$axios.$get('/orders/' + id)
    this.loading = false;
  },
  methods: {
    computeImageUrl,
    getVariation(product, variation) {
      return product.template.split('|').map((item, index) => item + ': ' + variation.name.split('|')[index]).join(', ');
    },
  }
}
</script>
