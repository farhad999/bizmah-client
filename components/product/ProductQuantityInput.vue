<template>
  <div class="product-quantity">
    <button
      class="minus-button"
      type="button"
      @click="minusQty"
      :disabled="currentQty<=0"
    >
      <i class="fa fa-minus"></i>
    </button>
    <input
      type="number"
      :min="1"
      :max="10"
      v-model.number="currentQty"
      disabled
    />
    <button
      class="plus-button"
      type="button"
      :disabled="currentQty>=5"
      @click="plusQty"
    >
      <i class="fa fa-plus"></i>
    </button>

  </div>
</template>

<script>
export default {
  props: {
    qty: {
      type: Number,
      default: 1,
    },
    product: Object,
  },
  data: function () {
    return {
      currentQty: this.qty,
    };
  },
  watch: {
    qty: function () {
      this.currentQty = this.qty;
    },
    currentQty: function () {
      this.$emit('changeCurrentQty', this.currentQty);
    },
  },
  methods: {
    plusQty: function () {
      this.currentQty++;
      this.$emit('changeQty', this.currentQty, this.product);
    },
    minusQty: function () {
      if (this.currentQty > 1) this.currentQty--;
      this.$emit('changeQty', this.currentQty, this.product);
    },
  },
};
</script>

<style scoped lang="scss">
.product-quantity{
  position: relative;
  height: 30px;
  width: 130px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  font-family: Arial, Helvetica, sans-serif;

  .plus-button, .minus-button{
    width: 30px;
    flex-shrink: 0;
    font-size: 14px;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    padding: 0;
  }
  input{
    color: #000;
    font-size: 16px;
    opacity: 1;
    text-align: center;
    background-color: transparent;
    border: 0;
    padding: 0 0.5rem;
    width: 100%;
    flex-grow: 1;
    -webkit-appearance: none;
    appearance: none;
    border-right: 1px solid rgba(0, 0, 0, 0.5);
    border-left: 1px solid rgba(0, 0, 0, 0.5);
    box-shadow: none;
    outline: none;
  }

}
</style>
