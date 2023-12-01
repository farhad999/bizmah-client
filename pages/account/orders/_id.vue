<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12 mt-5">
        <ul class="account_bred">
          <li><a href="/" class="nuxt-link-active"><i class="fa fa-home"></i></a></li>
          <li>/</li>
          <li>
            <nuxt-link to="/account" aria-current="page">Account
            </nuxt-link>
          </li>
          <li>/</li>
          <li>
            <nuxt-link to="/account" class="nuxt-link-exact-active"
                       aria-current="page">My Orders</nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-body">

        <h3 class="account-sub-title d-none d-md-block">
          <i class="fa fa-shopping-bag align-middle mr-3"></i>Order Details
        </h3>

        <div v-if="order">

          <div class="row">
            <div class="col-md-6 border py-3">
              <strong>OrderId: </strong> {{ order.id }}
            </div>
            <div class="col-md-6 border py-3">
              <strong>Invoice: </strong> {{ order.invoice_no }}
            </div>
            <div class="col-md-6 border py-3">
              <strong>Date: </strong> {{ order.sale_date }}
            </div>
            <div class="col-md-6 border py-3">
              <strong>Shipping Status: </strong> {{ order.shipping_status }}
            </div>
            <div class="col-md-6 border py-3">
              <strong>Payment Method: </strong> {{ order.payment_method }}
            </div>
            <div class="col-md-6 border py-3">
              <strong>Total: </strong> {{ order.final_total }}
            </div>
            <div class="col-md-6 border py-3">
              <strong>Total Paid: </strong> {{ order.total_paid }}
            </div>
            <div class="col-md-6 border py-3">
              <strong>Total Due: </strong> {{ order.sell_due }}
            </div>
            <div class="col-12 border py-3">
              <strong>Shipping Address: </strong> {{ order.shipping_address }}
            </div>
          </div>

          <h4 class="mt-2">Products</h4>
          <table class="table">
            <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <td>Quantity</td>
            </tr>
            </thead>
            <tbody>
            <tr :key="index" v-for="(sellLine, index) in order.sell_lines">
              <td style="width: 100px">
                <img v-lazy="sellLine.product.image_url"
                     alt="image"
                     style="width: 80px; height: 80px"
                />
              </td>
              <td><h6>{{ sellLine.product.name }}</h6>
                <p>{{ getVariation(sellLine.variations) }}</p>
              </td>
              <td>{{ sellLine.variations.default_sell_price }}</td>
              <td>{{ sellLine.quantity }}</td>
              <td v-if="order.status === 'final'">
                <button @click="()=>selectAndOpenReviewModal(sellLine)" class="btn btn-sm btn-primary">Review</button>
              </td>
            </tr>
            </tbody>
          </table>

          <b-modal
            v-model="reviewModal"
            title="Write Your Review"
            hide-footer
          >
            <div>
              <div>
                <form @submit.prevent="postReview">
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <label for="rating">
                        Your rating
                        <span class="required">*</span>
                      </label>
                      <BFormRating v-model="reviewData.rate" no-border show-value/>
                    </div>

                    <div class="col-12">
                      <div class="form-group">
                        <label>
                          Your review
                          <span class="required">*</span>
                        </label>
                        <textarea
                          rows="4"
                          class="form-control"
                          v-model="reviewData.review"
                        ></textarea>
                      </div>
                    </div>

                    <div class="col-12">
                      <button type="submit">Submit</button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </b-modal>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BFormRating} from "bootstrap-vue";

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
    }
  },
  fetch() {
    let id = this.$route.params.id;
    this.$axios.get('/orders/' + this.orderId)
      .then(res => {
        this.order = res.data;
      });
  },
  methods: {
    getVariation(variation) {
      return variation.product_variation.name.split('|').map((item, index) => item + ': ' + variation.name.split('|')[index]).join(', ');
    },
    setRating: function (e) {
      if (e.currentTarget.parentNode.querySelector('.active'))
        e.currentTarget.parentNode
          .querySelector('.active')
          .classList.remove('active');
      e.currentTarget.classList.add('active');
    },
    postReview() {

      let data = {...this.reviewData};
      data.order_id = this.orderId;
      data.product_id = this.selectedItem.product?.id;

      this.$axios.post('/review', data)
        .then(res => {
          let {status} = res.data;
          if (status === 'Success') {
            this.$toast.success('Review Added');
          }
        })
    },
    selectAndOpenReviewModal(product) {
      this.selectedItem = product;
      this.reviewModal = true;
    }
  }
}
</script>
