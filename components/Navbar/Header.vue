<template>
  <div>
    <div class="header-middle">

      <div class="container-fluid">

        <div class="header-middle-content">

          <!--    Phn and Search     -->
          <div class="d-flex align-items-center">

            <button @click="$emit('openMobileMenu')"
                    class="d-md-none mr-2 mobile-toggle-btn"
            >
              <i class="fa fa-bars"></i>
            </button>

            <div class="mobile-brand d-md-none">
              <nuxt-link to="/">
                <img
                  src="assets/images/logo.png" alt="Bizmah">
              </nuxt-link>
            </div>

            <div class="mr-5 d-none d-lg-flex align-items-center">
              <i class="fa-brands fa-whatsapp nav-icon pr-2"></i>
              <i class="fa fa-phone nav-icon"></i>
              <Search/>
            </div>
          </div>

          <!-- 	Logo     -->
          <div class="nav-brand d-none d-md-block">
            <nuxt-link to="/">
              <img
                src="assets/images/logo.png" alt="Bizmah">
            </nuxt-link>
          </div>

          <div class="d-flex align-items-center">

            <button class="cart-btn" @click="cartStatus = true ">
              <span class="badge badge-pill badge-primary">{{ itemCount }}</span>
              <i class="fa fa-shopping-cart nav-icon"></i>
            </button>
            <div class="ml-3">
              <nuxt-link v-if="$auth.loggedIn" to="/account">
                <i class="fa fa-user nav-icon"></i>
              </nuxt-link>

              <nuxt-link v-else to="/login">
                <i class="fa fa-sign-in-alt nav-icon"></i>
              </nuxt-link>
            </div>

          </div>

        </div>

      </div>

    </div>

    <!--Header categories -->
    <div class="category-desktop">
      <div class="container-fluid">
        <ul class="list">
          <li v-for="category in categories" class="menu-item">
            <span>{{ category.name }}</span>
            <div class="mega-menu row" v-if="category.children && category.children.length">
              <div class="col-md-9">
                <ul class="row">
                  <li v-for="child in category.children" class="sub-item col-md-3">
                    <nuxt-link :to="`/category/${category.slug}/${child.slug}`">
                      {{ child.name }}
                    </nuxt-link>
                    <ul v-if="child.children && child.children.length"
                        class="sub-sub-menu"
                    >
                      <li v-for="item in child.children" class="sub-sub-menu-item">
                        <nuxt-link :to="`/category/${category.slug}/${child.slug}/${item.slug}`">{{
                            item.name
                          }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="col-md-3 overflow-hidden">
                <img :src="computeImageUrl(category.image)"
                class="w-100"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>

    <div class="header-bottom d-lg-none">

      <div class="container-fluid">
        <div class="content">
          <div class="align-items-center mr-2 d-none d-md-flex">
            <i class="fa-brands fa-whatsapp nav-icon pr-2"></i>
            <i class="fa fa-phone nav-icon"></i>
          </div>

          <Search/>

          <div class="checkout d-none d-md-block">
            <nuxt-link to="/checkout">Checkout</nuxt-link>
          </div>
        </div>

      </div>

    </div>

    <Cart @closeCart="cartStatus = false"
          :cart-open="cartStatus"
    />

  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      cartStatus: false,
    }
  },
  computed: {
    ...mapGetters('cart', ['itemCount']),
    categories() {
      return this.$store.state.product.categories;
    }
  },
}
</script>

<style scoped lang="scss">
.header-middle {
  background-color: #1d1d1d;

  .header-middle-content {
    display: flex;
    align-items: center;
    color: white;
    justify-content: space-between;
    position: relative;
    height: 80px;
  }

  .mobile-toggle-btn{
    background-color: transparent;
    border: none;
    color: white;
  }

  .nav-brand {
    //center it horizontally
    //using absolute position


    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    img {
      height: 60px;
      width: 100%;
    }

  }

  .mobile-brand {
    padding-left: 10px;

    img {
      height: 35px;
      width: 100%;
    }
  }


  .cart-btn {
    position: relative;
    cursor: pointer;
    background-color: unset;
    border: unset;
    color: inherit;
    //move badge right top
    .badge {
      position: absolute;
      top: -5px;
      right: -5px;
    }
  }

}

.header-bottom {

  background-color: #eee;

  .content {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .checkout {
      margin-left: 10px;
    }

  }

}

.category-desktop {
  background-color: #eee;
  position: relative;

  //hide on tablet and mobile

  @media (max-width: 767px) {
    display: none;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: center;

    .menu-item {
      padding: 10px 20px;
      //position: relative;
      span {
        font-family: VisbyCF-Medium;
      }

      cursor: pointer;

      .mega-menu {
        display: none;
        position: absolute;
        width: 90vw;
        height: 60vh;
        margin: 0 auto;
        padding: 10px 20px;
        top: 30px;
        left: 50%;
        background-color: white;
        z-index: 10;
        transform: translateX(-50%);
        border: 1px solid #fafafa;

        .sub-item {
          & > a {
            font-weight: bold;
            font-size: 16px;
            text-transform: uppercase;
            //padding: 5px 0;
            display: block;
            border-bottom: 1px solid #999;
          }
        }

        .sub-sub-menu {
          margin-left: 0;
          padding-top: 10px;
          padding-bottom: 10px;

          .sub-sub-menu-item {
            a {
              font-size: 15px;
              padding: 15px 0;
              margin: 5px 0;
              font-family: VisbyCF-Light;
            }
          }
        }

      }

      &:hover {
        .mega-menu {
          display: flex;
        }
      }

    }
  }
}


</style>
<script setup>
import Search from "./Search.vue";
import Cart from "~/components/cart/Cart.vue";
import {computeImageUrl} from "~/utils/common";
</script>
