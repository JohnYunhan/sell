<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div v-show="food.count" class="cart-decrease" @click.stop="decreaseCart($event)">
        <i class="fa fa-minus-circle"></i>
      </div>
    </transition>
    <div v-show="food.count" class="cart-count">{{food.count}}</div>
    <div @click.stop="addCart($event)" class="cart-add">
      <i class="fa fa-plus-circle"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>
<style lang="sass">
@import "cartcontrol.scss";
</style>
