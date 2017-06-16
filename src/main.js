// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from './components/goods/goods';
import seller from './components/seller/seller';
import ratings from './components/ratings/ratings';
import './common/sass/index.scss';
import Ripple from 'vue-ripple-directive';
import VueLazyload from 'vue-lazyload';
// import Toasted from 'vue-toasted';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
// Vue.use(Toasted);
Vue.directive('ripple', Ripple);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://www.yunhan723.top/img/error.png',
  loading: 'http://www.yunhan723.top/img/loading.gif',
  attempt: 1
});

let router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/goods',
    component: goods
  }, {
    path: '/seller',
    component: seller
  }, {
    path: '/ratings',
    component: ratings
  }, {
    path: '*',
    component: goods
  }],
  linkActiveClass: 'active'
});

new Vue({
  template: '<App/>',
  router,
  components: { App }
}).$mount('#app');

router.replace('/goods');
