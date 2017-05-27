<template>
  <div>
    <div class="goods">
      <div class="meau-wrapper" ref="meauWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="meau-item" :class="{'current':currentIndex === index}" @click="selectMeau(index,$event)">
            <span class="text border-1px">
            <span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" @click="selectFood(food,$event)" class="food-item border-1px">
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
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" ref="foodControl"></food>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import food from 'components/food/food';

const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      srcollY: 0,
      foodsScroll: null,
      selectedFood: {}
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i];
        let h2 = this.listHeight[i + 1];
        // 滚动的位置在某一区块时
        if (!h2 || (this.srcollY >= h1 && this.srcollY < h2)) {
          return i;
        }
      }
      return 0;
    },
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
  created() {
    this.$http.get('/api/goods').then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
          this.initScroll();
          this.caculateHeight();
        });
      }
    });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    initScroll() {
      // click: true恢复默认的点击事件
      this.menuScroll = new BScroll(this.$refs.meauWrapper, {
        click: true
      });
      // probeType: 3 监测实时滚动的位置
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        // 获取滚动的位置的纵坐标(正值)
        this.srcollY = Math.abs(Math.round(pos.y));
      });
    },
    caculateHeight() {
      // 获取每个区块的高度
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMeau(index, event) {
      // 去掉pc端自带的点击事件
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      // 滚动到相应的节点
      let pos = foodList[index];
      this.foodsScroll.scrollToElement(pos, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      // 触发子组件的show方法
      this.$refs.foodControl.show();
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  }
};
</script>
<style lang="sass">
@import "goods.scss";
</style>
