<template>
  <div>
    <div class="header-middle">

      <div class="container-fluid">

        <div class="header-middle-content">

          <!--    Phn and Search     -->
          <div class="d-flex align-items-center">
            <i class="fa fa-bars d-lg-none"></i>
            <div class="me-5 d-none d-lg-flex align-items-center">
              <i class="fa-brands fa-whatsapp nav-icon pe-2"></i>
              <i class="fa fa-phone nav-icon"></i>
              <Search/>
            </div>
          </div>

          <!-- 	Logo     -->
          <div class="nav-brand">
            <nuxt-link to="/">
              <img
                src="assets/images/logo.png" alt="Bizmah">
            </nuxt-link>
          </div>

          <div>
            <i class="fa fa-shopping-cart nav-icon"></i>
          </div>

        </div>

      </div>

    </div>

    <!--Header categories -->
    <div class="category-desktop">
      <div class="container-fluid">
        <ul class="list">
          <li>
            <span>Menu-1</span>
            <ul class="mega-menu">
              <li>
                <span class="item">
                  Menu-1-1
                </span>
                <ul>
                  <li>Menu-1-1-1</li>
                  <li>Menu-1-1-2</li>
                  <li>Menu-1-1-3</li>
                </ul>
              </li>
              <li>Menu-1-2</li>
              <li>Menu-1-3</li>
            </ul>
          </li>
          <li>Menu-2</li>
          <li>Menu-3</li>
          <li>Menu-4</li>
        </ul>
      </div>
    </div>

    <div class="header-bottom d-lg-none">

      <div class="container-fluid">
        <div class="content">
          <div class="d-flex align-items-center me-2">
            <i class="fa-brands fa-whatsapp nav-icon pe-2"></i>
            <i class="fa fa-phone nav-icon"></i>
          </div>

          <Search/>

          <div class="checkout">
            <nuxt-link to="/checkout">Checkout</nuxt-link>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

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

  .nav-brand{
    //center it horizontally
    //using absolute position
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    img{
      height: 60px;
      width: 100%;
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

    li {
      padding: 5px 10px;
      //position: relative;
      .mega-menu {
        display: none;
        position: absolute;
        width: 90vw;
        margin: 0 auto;
        top: 30px;
        left: 50%;
        background-color: white;
        border: 1px solid;
        z-index: 10;
        transform: translateX(-50%);

        .item {
          font-weight: bold;
          text-decoration: underline;
        }

      }

      &:hover {
        .mega-menu {
          display: block;
        }
      }

    }
  }
}


</style>
<script setup>
import Search from "./Search.vue";
</script>
