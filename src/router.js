import VueRouter from 'vue-router';
import Topic from './views/topic';
import TopicDetail from './views/topic_detail';
import Login from './views/login';
import UserDetail from './views/user_detail';

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
  component: Login,
}, {
  path: '/user/:username',
  component: UserDetail,
}];

export default new VueRouter({
  routes,
});
