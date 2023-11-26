<template>
  <div class="custom-accordion">
    <div class="summary" @click="open = !open">
      <div class="title">{{title}}</div>
      <i class="fa fa-chevron-down"></i>
    </div>
    <b-collapse :visible="open">
      <slot></slot>
    </b-collapse>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false,
    }
  }
}
</script>

<style scoped lang="scss">
.summary {
  display: flex;
  align-items: center;
  justify-content:space-between;
  position: relative;
  line-height: 1;
  padding: 15px 0;
  cursor: pointer;
}

.custom-accordion{
  margin-bottom: 0;
  border-top: .1rem solid #eee;
  border-bottom: .1rem solid #eee;
  font-family: VisbyCF-Medium;

  .title{
    font-family: VisbyCF-Medium;
    font-size: 17px;
  }

}

</style>
