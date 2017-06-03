<template>
  <div class="ratings" ref="ratingContent">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="service-score">
            <span class="service">服务态度</span>
            <star :size="24" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="food-score">
            <span class="foods">商品质量</span>
            <star :size="24" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-time">
            <span class="delivery">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <splite></splite>
      <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" v-on:ratingTypeSelect="ratingTypeSelect" v-on:contentToggle="contentToggle" ref="ratingSelect"></ratingselect>
      <div class="ratings-wrapper">
        <ul v-show="ratings && ratings.length">
          <li v-show="needShow(item.rateType,item.text)" v-for="item in ratings" class="ratings-item border-1px">
            <div class="avatar">
              <img :src="item.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="seller.serviceScore"></star>
                <span v-if="item.deliveryTime" class="delivery">{{item.deliveryTime}}分钟送达</span>
                <span v-else class="delivery">33分钟送达</span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend-wrapper">
                <i class="fa" :class="{'fa-thumbs-up':item.rateType===0,'fa-thumbs-down':item.rateType===1}"></i>
                <span v-for="(list,index) in item.recommend" v-if="index<4" class="recommend">{{list}}</span>
              </div>
            </div>
            <div class="rate-time">{{item.rateTime | formatTime}}</div>
          </li>
        </ul>
        <div class="no-rating" v-show="!ratings||!ratings.length">暂无评价</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import splite from 'components/splite/splite';
import star from 'components/star/star';
import ratingselect from 'components/ratingselect/ratingselect';
import {
  formatDate
} from 'common/js/date';

const ALL = 2;
const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false
    };
  },
  created() {
    this.$http.get('/api/ratings').then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.ratings = response.data;
        this.$nextTick(() => {
          this.initScroll();
        });
      }
    });
  },
  methods: {
    initScroll() {
      this.scrollRating = new BScroll(this.$refs.ratingContent, {
        click: true
      });
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
        this.scrollRating.refresh();
      });
    },
    contentToggle(bool) {
      this.onlyContent = bool;
      // DOM的更新是异步的
      this.$nextTick(() => {
        this.scrollRating.refresh();
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
    splite,
    star,
    ratingselect
  }
};
</script>
<style lang="sass">
@import "ratings.scss";
</style>
