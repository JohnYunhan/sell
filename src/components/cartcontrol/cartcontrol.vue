<template>
  <div class="cartcontrol">
    <div class="cart-decrease">
      <i class="fa fa-minus-circle"></i>
    </div>
    <div class="cart-count">10</div>
    <div class="cart-add">
      <i class="fa fa-plus-circle"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {}
};
</script>
<style lang="sass">
@import "cartcontrol.scss";
</style>
