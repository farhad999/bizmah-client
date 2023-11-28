<template>
  <div class="filter-chip" @click="$emit('remove', item)">
    {{ item.template }}: {{ item.value }}
    <i class="fa fa-close close-icon"></i>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    }
  }
}
</script>
