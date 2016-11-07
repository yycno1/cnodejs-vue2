import VueRouter from 'vue-router';
import Index from './views/index';

const routes = [{
  path: '/',
  component: Index,
}, {
  path: '/home',
  component: {
    template: '<div>index</div>',
  },
}, {
  path: '/topic/:id',
  component: {
    template: '<div>topic detail</div>',
  },
}, {
  path: '/login',
  component: {
    template: '<div>loginloginloginloginloginloginlogin</div>',
  },
}, {
  path: '/user/:username',
  component: {
    template: '<div>user center asdasd</div>',
  },
}];

export default new VueRouter({
  routes,
});
