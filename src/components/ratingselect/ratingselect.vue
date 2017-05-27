<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="all type">{{desc.all}}</span>
      <span class="positive type">{{desc.positive}}</span>
      <span class="negative type">{{desc.negative}}</span>
    </div>
    <div class="rating-switch">
      <i class="fa fa-check-circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  }
};
</script>
<style lang="scss">
@import "ratingselect.scss";
</style>
