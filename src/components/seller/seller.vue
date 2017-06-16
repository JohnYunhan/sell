<template>
  <div>
    <div class="seller" ref="sellerContent">
      <div class="seller-content">
        <div class="seller-header">
          <div class="header-top border-1px">
            <h1 class="name">{{seller.name}}</h1>
            <div class="sell">
              <star :size="36" :score="seller.score"></star>
              <span class="rank-rate">（{{seller.rankRate}}）</span>
              <span class="sell-count">月售{{seller.sellCount}}单</span>
            </div>
            <div class="collect" @click="collected=!collected" v-ripple="'rgba(255, 255, 255, 0.5)'">
              <i class="fa fa-heart animated scale" :style="{'color': collected ?'rgb(240, 20, 20)':'rgb(147, 153, 159)'}"></i>
              <span class="text" :style="{'color': collected ?'rgb(77, 85, 93)':'rgb(147, 153, 159)'}">{{collected?'已收藏':'收藏'}}</span>
            </div>
          </div>
          <div class="header-bottom">
            <div class="min-price block">
              <span class="text">起送价</span>
              <span class="price">{{seller.minPrice}}</span>元
            </div>
            <div class="delivery-price block">
              <span class="text">配送费</span>
              <span class="price">{{seller.deliveryPrice}}</span>元
            </div>
            <div class="delivery-time block">
              <span class="text">送达时间</span>
              <span class="price">{{seller.deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
        <splite></splite>
        <div class="seller-bulletin">
          <h1 class="title">公告与活动</h1>
          <p class="bulletin">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="seller-supports">
          <li v-for="(item,index) in seller.supports" class="support-item">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
        <splite></splite>
        <div class="seller-pic">
          <h1 class="title">商家实景</h1>
          <div class="pic-wrapper" ref="picsScroll">
            <ul class="pic-list" ref="pics">
              <li v-for="(pic,index) in seller.pics" @click="lookPic(index)" class="pic-item" v-ripple="'rgba(255, 255, 255, 0.35)'">
                <img :src="pic" width="120" height="90">
              </li>
            </ul>
          </div>
        </div>
        <splite></splite>
        <div class="seller-infor">
          <h1 class="title">商家信息</h1>
          <ul>
            <li v-for="infor in seller.infos" class="infor">{{infor}}</li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="look-pic" v-show="showPic">
        <div class="pic-wrapper clearfix">
          <div class="pic-main">
            <div class="pic">
              <img :src="this.seller.pics[imgIndex]" width="100%">
            </div>
            <div class="pic-tip">{{imgIndex+1}} of {{this.seller.pics.length}}</div>
          </div>
        </div>
        <div class="pic-btn">
          <i @click="upToImage" :style="{'color': imgIndex===0 ?'rgba(255, 255, 255, .5)':'rgba(255, 255, 255, .8)'}" class="fa fa-arrow-left" v-ripple="'rgba(255, 255, 255, 0.35)'"></i>
          <i @click="showPic=false" class="fa fa-close"></i>
          <i @click="downToImage" :style="{'color': imgIndex===this.seller.pics.length-1 ?'rgba(255, 255, 255, .5)':'rgba(255, 255, 255, .8)'}" class="fa fa-arrow-right" v-ripple="'rgba(255, 255, 255, 0.35)'"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import splite from 'components/splite/splite';
import star from 'components/star/star';
import vueImages from 'vue-images';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      collected: false,
      showPic: false,
      imgIndex: 0
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  methods: {
    initScroll() {
      if (!this.scrollSeller) {
        this.scrollSeller = new BScroll(this.$refs.sellerContent, {
          click: true
        });
      } else {
        this.scrollSeller.refresh();
      }
      if (!this.scrollPics) {
        if (this.seller.pics) {
          // 计算所有图片的宽度
          let picWidth = 120;
          let margin = 6;
          let picConut = this.seller.pics.length;
          let width = picWidth * picConut + margin * (picConut - 1) + 'px';
          this.$refs.pics.style.width = width;
          this.scrollPics = new BScroll(this.$refs.picsScroll, {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        }
      } else {
        this.scrollPics.refresh();
      }
    },
    lookPic(index) {
      this.imgIndex = index;
      this.showPic = true;
    },
    downToImage() {
      if (this.imgIndex < this.seller.pics.length - 1) {
        this.imgIndex++;
      } else {
        window.alert('到底啦~');
      }
    },
    upToImage() {
      if (this.imgIndex > 0) {
        this.imgIndex--;
      } else {
        window.alert('到头啦~');
      }
    }
  },
  computed: {
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  components: {
    splite,
    star,
    vueImages
  }
};
</script>
<style lang="sass">
@import "seller.scss";
</style>
