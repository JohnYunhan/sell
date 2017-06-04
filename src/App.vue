<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller" :goods="goods"></router-view>
  </div>
</template>
<script>
import header from './components/header/header.vue';

const ERR_OK = 0;

export default {
  data() {
      return {
        seller: {},
        goods: []
      };
    },
    created() {
      this.$http.get('/api/seller').then(response => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
        }
      });
      this.$http.get('/api/goods').then(response => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
        }
      });
    },
    components: {
      'v-header': header
    }
};
</script>
<style lang="sass">
@import "app.scss";
</style>
