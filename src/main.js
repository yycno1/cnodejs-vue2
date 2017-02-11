import Vue from 'vue';
import VueRouter from 'vue-router';
import http from 'vue-resource';

import fastclick from 'fastclick';

import Alert from './plugins/alert';
import Confirm from './plugins/confirm';

import App from './App';

import router from './router';
import store from './vuex/store';

import filters from './common/filter';

import './assets/style/common.scss';

Vue.use(VueRouter);
Vue.use(http);
Vue.use(Alert);
Vue.use(Confirm);

for (const key of Object.keys(filters)) {
  Vue.filter(key, filters[key]);
}
const storage = window.sessionStorage;
let count = storage.getItem('count') || 0;
storage.setItem('/', 0);

router.beforeEach((to, from, next) => {
  const toPath = to.path;
  const fromPath = from.path;

  const toIndex = storage.getItem(toPath);
  const fromIndex = storage.getItem(fromPath);

  if (toIndex) {
    if (!fromIndex || toIndex > fromIndex) {
      store.commit('UPDATE_DIRECTION', 'forword');
      console.log('forword');
    } else {
      store.commit('UPDATE_DIRECTION', 'backword');
      console.log('backword');
    }
  } else {
    count += 1;
    storage.setItem('count', count);
    storage.setItem(toPath, count);
    store.commit('UPDATE_DIRECTION', 'forword');
    console.log('forword');
  }
  setTimeout(next, 10);
});

window.addEventListener('DOMContentLoaded', () => {
  fastclick.attach(document.body);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store,
});
