<template>
  <span class="star" :class="starType">
    <span v-for="item in itemClass" class="star-item" :class="item"></span>
  </span>
</template>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  props: {
    size: {},
    score: {}
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    itemClass() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      // 判断是否是小数(半星)
      let hasDecimal = score % 1 !== 0;
      // 全星个数
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>
<style lang="sass">
@import "star.scss";
</style>
