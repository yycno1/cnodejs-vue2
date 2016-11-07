import Vue from 'vue';
import VueRouter from 'vue-router';
import http from 'vue-resource';

import App from './App';
import router from './router';
import store from './vuex/store';

import './assets/style/common.scss';

Vue.use(VueRouter);
Vue.use(http);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store,
});
