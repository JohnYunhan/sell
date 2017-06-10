<template>
  <div class="ratingselect border-2px">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="positive block" :class="{'active':selectedType===2}" v-ripple="'rgba(0, 0, 0, 0.5)'">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="positive block" :class="{'active':selectedType===0}" v-ripple="'rgba(0, 0, 0, 0.5)'">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="negative block" :class="{'active':selectedType===1}" v-ripple="'rgba(255, 255, 255, 0.5)'">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent($event)" class="rating-switch" v-ripple>
      <i class="fa fa-check-circle" :class="{'on':onlyContents}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
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
  },
  data() {
    return {
      selectedType: this.selectType,
      onlyContents: this.onlyContent
    };
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedType = type;
      // 向父组件传递改变后的值
      this.$emit('ratingTypeSelect', this.selectedType);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.onlyContents = !this.onlyContents;
      // 向父组件传递改变后的值
      this.$emit('contentToggle', this.onlyContents);
    }
  }
};
</script>
<style lang="scss">
@import "ratingselect.scss";
</style>
