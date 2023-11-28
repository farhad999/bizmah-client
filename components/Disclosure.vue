<template>
  <div class="disclosure disclosure-has-popup" data-index="1">
    <div class="summary" @click="open = !open">
      <span class="text">{{ title }}</span>
      <i class="fa fa-chevron-down"></i>
    </div>
    <div class="content" :class="{'show' : open}">
      <div class="header">
        <a href="#"
           class="reset-button">
          Reset
        </a>
        <span class="close-button" @click="open = false">
          <i class="fa fa-x"></i>
        </span>
      </div>

      <ul class="body">
        <li :key="index" v-for="(item, index) in items"
            @change="()=>onClickItem(item)"
        >
          <label class="d-block">
            <input type="checkbox" :value="item"
                   :checked="isItemActive(item)"
            >
            {{ item }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      open: false,
    }
  },
  methods: {
    onClickItem(value) {
      this.$store.dispatch('product/applyVariation', {
        template: this.title,
        value: value,
      })
    }
    ,
    isItemActive(item) {
      let variations = this.$store.state.product.filters.variations;
      //find the index of the item
      let index = variations.findIndex((variation) => {
        return variation.template === this.title && variation.value === item;
      })
      return index > -1;
    }
  },
}
</script>

<style scoped lang="scss">
.disclosure {
  position: relative;

  .summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #999;
  }

  .content {
    border: 1px solid #999;
    margin: 5px 0;
    display: none;

    &.show {
      display: block;
    }

    .header {
      background-color: #fff;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #999;

      .close-button {
        color: rgba(0, 0, 0, 0.75)
      }
    }

    .body {
      padding: 10px;

      label {
        font-weight: bold;
        padding: 2px;
      }
    }
  }

  &.disclosure-has-popup {

    @media (max-width: 968px) {
      .content {
        position: absolute;
        top: 100%;
        left: 2px;
        width: 250px;
        overflow-y: auto;
        z-index: 5;
        background-color: white;
      }
    }


  }
}
</style>
