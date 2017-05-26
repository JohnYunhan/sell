<template>
  <transition name="move">
    <div v-show="showFood" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div @click="back" class="back">
            <i class="fa fa-angle-left"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFood: false
    };
  },
  methods: {
    show() {
      this.showFood = true;
    },
    back() {
      this.showFood = false;
    }
  }
};
</script>
<style lang="sass">
@import "food.scss";
</style>
