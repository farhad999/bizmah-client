<template>
  <div class="card my-3">
    <div class="card-body">
      <div class="d-flex flex-column align-items-center">
        <h3>{{ error.statusCode }}</h3>
        <div>{{ error.message }}</div>
        <nuxt-link to="/" class="btn btn-primary btn-sm mt-2">Home</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
};
</script>
