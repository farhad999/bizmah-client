<template>
  <div>

    <section class="breadcrumb">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <div class="breadcrumb-text d-flex flex-column align-items-center justify-content-center">
              <h5>{{ title }}</h5>
              <ul class="d-flex">
                <li>
                  <nuxt-link to="/" class="nuxt-link-active">Home</nuxt-link>
                </li>
                <li><a><i class="fas fa-angle-double-right"></i></a></li>
                <li><a>{{ title }}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container">

      <div v-if="!loading">
        <div>
          <h4 class="p-2 pt-2">{{ title }}</h4>
        </div>
        <div class="box-content" style="min-height: 200px">
          <div v-if="page || !loading" class="p-2">
            <div class="ql-editor" v-html="page.content"></div>
          </div>
          <div v-else-if="!loading">
            <h2>Page Not Found</h2>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="skeleton"></div>
        <div class="mt-5">
          <div class="skeleton mb-1" v-for="(index) in [0, 1, 2,3 , 4, 5, 6]"></div>
          <div class="skeleton w-30"></div>
        </div>

        <div class="mt-5">
          <div class="skeleton mb-1" v-for="(index) in [0, 1, 2,3 , 4, 5, 6]"></div>
          <div class="skeleton w-30"></div>
        </div>

        <div class="mt-5">
          <div class="skeleton mb-1" v-for="(index) in [0, 1, 2,3 , 4, 5, 6]"></div>
          <div class="skeleton w-30"></div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: '',
      loading: true,
    }
  },
  async fetch() {

    this.page = await this.$axios.$get('/page/' + this.$route.params.slug);
    this.loading = false;
    this.title = this.page.title;

  },
  computed: {
    title() {
      let slug = this.$route.params.slug;
      const words = slug.split("-");
      return words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
      }).join(' ');
    }
  }
}
</script>
