import VueRouter from 'vue-router';
import Topic from './views/topic';

const routes = [{
  path: '/',
  component: Topic,
}, {
  path: '/home',
  component: Topic,
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
