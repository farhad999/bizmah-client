<template>

  <div class="search" v-click-outside="closeSearch">
    <div class="search-box">
      <input type="text" placeholder="Search…"
             class="input-search"
             v-model="search"
             @focus="openSearch"
             @input="handleSearch"
      >
      <button>
        <i @click="submitSearch" class="fa fa-search"></i>
      </button>

    </div>

    <!----Search Result---->

    <div class="search-result"
         v-show="searchStatus && search.length"
    >
      <div v-if="results.length">
        <div class="search-header">
          {{ searchData.total }} products
        </div>

        <div class="search-body">
          <ul>
            <li v-for="(result,index) in results"
                :key="index"
                class="item"
            >
              <SearchItem @close="closeSearch" :item="result"/>
            </li>
          </ul>
        </div>

        <div class="search-bottom">
          <nuxt-link :to="'/shop?q='+search">View More</nuxt-link>
        </div>
      </div>

      <div v-else class="py-4 p-2">
        <div v-if="loading" class="d-flex justify-content-center">
          <span class="spinner-border"></span>
        </div>
        <div v-else>
          No Products Found
        </div>
      </div>

    </div>
  </div>

</template>


<script>


import {computeImageUrl} from "../../utils/common";
import SearchItem from "../SearchItem.vue";
import ClickOutside from 'vue-click-outside'
import debounce from 'lodash/debounce'

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
    handleSearch: debounce(function () {
      this.performSearch()
    }, 500),
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
  z-index: 100;
  box-shadow: 0 10px 15px rgba(0, 0, 0, .2), 0 1px 0 rgba(0, 0, 0, .05) inset, 0 -5px 0 0 #fff;

  @media (max-width: 992px) {
    width: 100%;
  }

  .show {
    display: block;
  }

  .search-header {
    background-color: #fafafa;
    padding: 5px 10px;
  }

  .search-body {
    overflow-y: auto;
    max-height: 70vh;

    //update scrollbar
    //make thin
    &::-webkit-scrollbar {
      width: 5px;
    }
    //track
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    //handle
    &::-webkit-scrollbar-thumb {
      background: #888;
    }
    //handle on hover
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

  }

  .search-bottom {
    background-color: #fafafa;
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
