import Vue from 'vue';
import VueRouter from 'vue-router';
import http from 'vue-resource';

import App from './App';

import router from './router';
import store from './vuex/store';

import filters from './common/filter';

import './assets/style/common.scss';

Vue.use(VueRouter);
Vue.use(http);

for (const key of Object.keys(filters)) {
  Vue.filter(key, filters[key]);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store,
});
