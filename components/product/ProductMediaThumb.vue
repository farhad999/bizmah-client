<template>
  <div>
    <div class="row" v-if="!loading">
      <div class="mb-2 media-thumb overflow-hidden"
           :class="[direction === 'left' ? 'col-sm-3' : 'col-md-2 col-sm-2 col-3']"
           @click="()=>onThumbClick(index)"
           :key="index"
           v-for="(image,index) in images">
        <nuxt-img :src="image.image_url" alt=""
                  class="w-100"
                  sizes="sm:150px"
                  lazy
        />
      </div>
    </div>

    <div class="row" v-else>
        <div
          :class="[direction === 'left' ? 'col-sm-3' : 'col-md-2 col-sm-2 col-3']"
          v-for="(i,index) in [1, 2, 3, 4, 5, 6]"
        >
          <div class="skeleton" :key="index" style="aspect-ratio: 1"></div>
        </div>
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
    },
    loading: {
      type: Boolean,
      default: false
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
