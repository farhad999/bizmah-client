<template>
  <div class="container">
    <div class="row my-3">
      <div class="col-sm-12">
        <ul class="account-breadcrumb">
          <li><a href="/" class="nuxt-link-active"><i class="fa fa-home"></i></a></li>
          <li>/</li>
          <li>
            <nuxt-link to="/account"
                       aria-current="page">Account
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="row bg-light py-2">
      <div class="col-sm-12">
        <div class="customer_bio">
          <div class="customer_image">
            <i class="fa fa-user"></i>
          </div>
          <div class="customer_info">
            <h6>Hello</h6>
            <h5 class="text-capitalize">{{ user.name }}</h5></div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="border">
          <div class="row">
            <div class="col-sm-3 col-4">
              <div class="account_item">
                <nuxt-link to="/account/profile" class=""><i class="fa fa-edit"></i>
                  <p>Profile Edit</p></nuxt-link>
              </div>
            </div>
            <div class="col-sm-3 col-4">
              <div class="account_item">
                <nuxt-link to="/account/orders" class=""><i class="fa fa-shopping-bag"></i>
                  <p>My Order</p></nuxt-link>
              </div>
            </div>
            <div class="col-sm-3 col-4">
              <div class="account_item">
                <nuxt-link to="/account/addresses"><i class="fa fa-map"></i>
                  <p>Address</p></nuxt-link>
              </div>
            </div>
            <div class="col-sm-3 col-4">
              <div class="account_item">
                <nuxt-link to="/wishlist" class=""><i class="fa fa-heart"></i>
                  <p>Wishlist</p>
                </nuxt-link>
              </div>
            </div>
            <div class="col-sm-3 col-4">
              <div class="account_item"><a @click="logout" href="javascript:void(0)">
                <i class="fas fa-sign-out-alt"></i>
                <p>Logout</p></a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  middleware: 'auth',
  auth: true,
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },

  mounted: function () {
    let user = this.$auth.user
  },
  methods: {
    logout: function () {

      //then remove user from store
      this.$auth.logout();
      this.$toast.success("Logout");
      this.$router.push('/')
    }
  }
}

</script>
