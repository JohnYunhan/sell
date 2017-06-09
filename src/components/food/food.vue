<template>
  <transition name="move">
    <div v-show="showFood" class="food" ref="foodScroll">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div @click="back" class="back">
            <i class="fa fa-angle-left"></i>
            <span class="text">返回</span>
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
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" v-on:ratingTypeSelect="ratingTypeSelect" v-on:contentToggle="contentToggle" ref="ratingSelect"></ratingselect>
          <div class="rating-warpper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatTime}}</div>
                <p class="text">
                  <i class="fa" :class="{'fa-thumbs-up':rating.rateType===0,'fa-thumbs-down':rating.rateType===1}"></i>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
          </div>
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
import {
  formatDate
} from 'common/js/date';

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
          // 恢复子组件中的默认值
          this.$refs.ratingSelect.selectedType = ALL;
          this.$refs.ratingSelect.onlyContents = false;
        }
      });
    },
    back() {
      this.showFood = false;
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    ratingTypeSelect(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scrollFood.refresh();
      });
    },
    contentToggle(bool) {
      this.onlyContent = bool;
      // DOM的更新是异步的
      this.$nextTick(() => {
        this.scrollFood.refresh();
      });
    }
  },
  filters: {
    formatTime(date) {
      var newDate = new Date(date);
      return formatDate(newDate, 'yyyy-MM-dd hh:mm');
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
