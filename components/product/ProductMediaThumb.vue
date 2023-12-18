<template>
  <div class="row">
    <div class="mb-2 media-thumb overflow-hidden"
         :class="[direction === 'left' ? 'col-sm-3' : 'col-md-2 col-sm-2 col-3']"
         @click="()=>onThumbClick(index)"
         :key="index"
         v-for="(image,index) in images">
      <nuxt-img :src="image.image_url" alt=""
                class="w-100"
                sizes="sm:150px"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'left'
    },
    images: {
      type: Array,
      required: true
    }
  },
  methods: {
    onThumbClick(index) {
      console.log({index})
      this.$emit('onThumbClick', index)
    }
  }
}
</script>

<style scoped>
.media-thumb {
  cursor: pointer;
}
</style>
