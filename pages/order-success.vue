<template>
  <div class="card">
    <div class="card-body d-flex flex-column justify-content-center align-items-center">
      <i class="fa fa-check-circle text-success" style="font-size: 40px"></i>
      <p style="font-size: 16px" class="mt-3">
        Thanks for your order. Your Order Number is
        <nuxt-link :to="`/account/orders/${order_no}`">{{ order_no }}</nuxt-link>
      </p>
      <div style="text-decoration: none" class="mt-2">
        <nuxt-link to="/" class="btn btn-primary btn-sm text-decoration-none">Home</nuxt-link>
        <nuxt-link to="/account/orders" class="btn btn-success btn-sm text-decoration-none">View Orders</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-success",
  data() {
    return {
      order_no: this.$route.query.order_no
    }
  },

}
</script>
