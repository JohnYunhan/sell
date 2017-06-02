<template>
  <transition name="move">
    <div v-show="showFood" class="food" ref="foodScroll">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div @click="back" class="back">
            <i class="fa fa-angle-left"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            ￥<span class="now">{{food.price}}</span><span class="old" v-show="food.oldPrice">￥<del>{{food.oldPrice}}</del></span>
          </div>
          <transition name="fade">
            <div v-show="!food.count || food.count===0" @click.stop="addToCart($event)" class="add-to-cart">
              加入购物车
            </div>
          </transition>
          <div v-show="food.count>0" class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
        </div>
        <splite v-show="food.info"></splite>
        <div v-show="food.info" class="desc">
          <h1 class="title">商品介绍</h1>
          <p class="info">{{food.info}}</p>
        </div>
        <splite></splite>
        <div class="food-rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Vue from 'vue';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import splite from 'components/splite/splite';
import ratingselect from 'components/ratingselect/ratingselect';
const ALL = 2;

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFood: false,
      selectType: ALL,
      onlyContent: false,
      desc: {}
    };
  },
  methods: {
    addToCart(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
    },
    show() {
      this.showFood = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.desc = {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      };
      this.$nextTick(() => {
        if (!this.scrollFood) {
          this.scrollFood = new BScroll(this.$refs.foodScroll, {
            click: true
          });
        } else {
          this.scrollFood.refresh();
        }
      });
    },
    back() {
      this.showFood = false;
    }
  },
  components: {
    cartcontrol,
    splite,
    ratingselect
  }
};
</script>
<style lang="sass">
@import "food.scss";
</style>
