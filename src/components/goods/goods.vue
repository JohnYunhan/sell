<template>
  <div class="goods">
    <div class="meau-wrapper" ref="meauWrapper">
      <ul>
        <li v-for="item in goods" class="meau-item">
          <span class="text border-1px">
          	<span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p v-show="food.description" class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥<del>{{food.oldPrice}}</del></span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';

const ERR_OK = 0;
export default {
  props: {
    seller: {}
  },
  data() {
    return {
      goods: []
    };
  },
  created() {
    this.$http.get('/api/goods').then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
          this.initScroll();
        });
      }
    });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.meauWrapper, {});

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {});
    }
  }
};
</script>
<style lang="sass">
@import "goods.scss";
</style>
