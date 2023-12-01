<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12 mt-3">
        <ul class="account_bred">
          <li><a href="/"><i class="fa fa-home"></i></a></li>
          <li>/</li>
          <li>
            <nuxt-link to="/account" aria-current="page">Account</nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="order-content">
          <h4 class="account-sub-title d-none d-md-block">
            <i class="fa fa-shopping-bag align-middle mr-3"></i>Orders
          </h4>

          <div v-if="loading">
            <div class="py-2 text-center">

              <table class="table table-bordered">
                <tr>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                </tr>
                <tr>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                </tr>
                <tr>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                </tr>
                <tr>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                </tr>
                <tr>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                  <td><div class="skeleton"></div></td>
                </tr>
              </table>
            </div>
          </div>

          <div v-else class="order-table-container text-center table-responsive">
            <table v-if="orders" class="table table-bordered table-order w-100 text-left">
              <thead>
              <tr>
                <th class="order-id">INVOICE</th>
                <th class="order-date">DATE</th>
                <th class="order-status">STATUS</th>
                <th class="order-price">TOTAL</th>
                <th class="order-action">ACTIONS</th>
              </tr>
              </thead>
              <tbody>
              <tr :key="index" v-for="(order,index) in orders.rows">
                <td>{{ order.invoice_no }}</td>
                <td>{{ order.sale_date }}</td>
                <td>{{ order.shipping_status }}</td>
                <td>{{ order.final_total |priceFormat }}</td>
                <td>
                  <nuxt-link :to="`/account/orders/${order.id}`" class="btn btn-primary">View</nuxt-link>
                </td>
              </tr>
              </tbody>
            </table>
            <div v-else>
              <hr class="mt-0 mb-3 pb-2"/>

              <div class="text-center p-0">
                <p class="mb-5 mt-5">No Order has been made yet.</p>
              </div>

              <nuxt-link to="/shop" class="btn btn-dark">Go Shop</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      selectedOrder: null,
      orderDetailsModal: false,
      loading: false,
    }
  },
  async fetch() {
    this.loading = true;
    this.orders = await this.$axios.$get(`/orders`);
    this.loading = false;
  },
  methods: {
    selectAndOpenModal(order) {
      this.selectedOrder = order;
      this.orderDetailsModal = true;
    },
    getVariation(variation) {
      console.log({variation})
      //return 'dd';
      return variation.product_variation.name.split('|').map((item, index) => item + ': ' + variation.name.split('|')[index]).join(', ');
    }
  }
}
</script>

<style scoped lang="scss">
.custom-order-detail-table {
  width: 100%;
  table-layout: fixed;
}
</style>
