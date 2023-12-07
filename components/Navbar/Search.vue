<template>

  <div class="search" v-click-outside="closeSearch">
    <div class="search-box">
      <input type="text" placeholder="Search…"
             class="input-search"
             v-model="search"
             @focus="openSearch"
             @input="performSearch"
      >
      <button>
        <i @click="submitSearch" class="fa fa-search"></i>
      </button>

    </div>

    <!----Search Result---->

    <div class="search-result"
         v-show="searchStatus && results.length"
    >

      <div class="search-header">
        {{ searchData.total }} products
      </div>

      <ul>
        <li v-for="(result,index) in results"
            :key="index"
            class="item"
        >
          <SearchItem @close="closeSearch" :item="result"/>
        </li>
      </ul>

      <div class="search-bottom">
        <nuxt-link to="/shop">View More</nuxt-link>
      </div>
    </div>
  </div>

</template>


<script>


import {computeImageUrl} from "../../utils/common";
import SearchItem from "../SearchItem.vue";
import ClickOutside from 'vue-click-outside'

export default {
  components: {SearchItem},
  props: {
    value: Boolean,
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      results: [],
      search: '',
      maxResult: 10,
      loading: false,
      searchStatus: false,
      searchData: '',
      hasData: false,
    }
  },
  methods: {
    computeImageUrl,
    performSearch() {
      this.loading = true;
      if (this.search) {
        this.$axios.get('/products', {
          params: {
            q: this.search
          }
        }).then(res => {
          this.searchData = res.data;
          this.results = res.data.data;
          this.searchStatus = true;
          this.loading = false;
        }).catch(er => {
          this.loading = false;
          console.log(er)
        })
      } else {
        this.results = [];
      }
    },
    openSearch() {
      this.searchStatus = true;
      //this.addCloseListener()
    },
    closeSearch() {
      this.searchStatus = false;
    },
    submitSearch() {
      this.$router.push({
        path: '/shop',
        query: {q: this.search}
      })
      this.closeSearch()
    },

  }
}
</script>

<style lang="scss">

.search {
  width: 250px;
  position: relative;
  border-radius: 5px;

  @media (max-width: 992px) {
    flex: 0 0 80%;
  }

  @media (max-width: 768px) {
    flex: 0 0 100%;
  }

}

.show-searchbar {
  transform: none;
  transition: all 0.2s ease-in-out;
  overflow: visible;
}


.search-box {
  position: relative;
  margin-left: 10px;

  .input-search {
    padding-left: 10px;
    width: 100%;
    border: unset;
    border-radius: 5px;
    background-color: #fff;

    &:focus {
      outline: none;
    }
  }

  button {
    position: absolute;
    right: 0;
    top: 0;
    color: black;
    padding: 2px 8px;
    background-color: transparent;
    outline: none;
    border: none;
  }

}

.search-result {
  background-color: white;
  position: absolute;
  width: 400px;
  top: 30px;
  left: 10px;
  color: black;
  max-height: 70vh;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 10px 15px rgba(0, 0, 0, .2), 0 1px 0 rgba(0, 0, 0, .05) inset, 0 -5px 0 0 #fff;

  @media (max-width: 992px) {
    width: 100%;
  }

  .show {
    display: block;
  }

  .search-header {
    background-color: #eee;
    padding: 5px 10px;
  }
;

  .search-bottom {
    background-color: #eee;
    padding: 5px 10px;
    text-align: center;
  }

  .item {
    padding: 15px 5px;

    .image-container {
      width: 50px;
      height: 50px;
      overflow: hidden;
      margin-right: 10px;

      img {
        width: 100%;
      }
    }

    .old-price {
      text-decoration: line-through;
    }

    .product-title {
      font-weight: bold;
    }

    &:hover {
      background-color: #fafafa;
    }

  }

}

</style>
