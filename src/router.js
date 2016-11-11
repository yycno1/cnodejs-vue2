import VueRouter from 'vue-router';
import Topic from './views/topic';
import TopicDetail from './views/topic_detail';

const routes = [{
  path: '/',
  component: Topic,
}, {
  path: '/topic',
  component: Topic,
}, {
  path: '/topic/:id',
  component: TopicDetail,
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
