<template>
  <nav class="breadcrumb-nav mb-2">

    <!--    <pre>bread: {{items}}</pre>-->

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <nuxt-link to="/">Home</nuxt-link>
      </li>

      <li class="breadcrumb-item" v-for="(item, index) in items" :key="index">
        <nuxt-link :to="item.url">{{ item.text }}</nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    }
  }
}
</script>
