import Vue from 'vue';
import http from 'vue-resource';

Vue.use(http);

const $http = Vue.http;

$http.options.root = 'https://cnodejs.org/api/v1';

// const token = '103a0652-dfa2-4b50-b1ad-27b3b2a0f5b8';

function fetchTopic({ page = 1, limit = 10, tab = 'all' }) {
  const url = 'topics';
  return $http.get(url, {
    params: {
      page,
      limit,
      tab,
    },
  });
}

function fetchTopicDetail(topicId, accesstoken) {
  const url = `topic/${topicId}`;
  return accesstoken ? $http.get(url, { params: { accesstoken } }) : $http.get(url);
}

function login(accesstoken) {
  const url = 'accesstoken';
  const postData = {
    accesstoken,
  };
  return $http.post(url, postData);
}

function fetchUserInfo(loginname) {
  const url = `user/${loginname}`;
  return $http.get(url);
}

function fetchCollectedTopics(loginname) {
  const url = `topic_collect/${loginname}`;
  return $http.get(url);
}

function collectTopic(data) {
  const url = 'topic_collect/collect';
  return $http.post(url, data);
}

function deCollectTopic(data) {
  const url = 'topic_collect/de_collect';
  return $http.post(url, data);
}

function ups(replyId, accesstoken) {
  const url = `reply/${replyId}/ups`;
  return $http.post(url, { accesstoken });
}

function reply(topicId, data) {
  const url = `topic/${topicId}/replies`;
  return $http.post(url, data);
}

export default {
  fetchTopic,
  fetchTopicDetail,
  login,
  fetchUserInfo,
  fetchCollectedTopics,
  collectTopic,
  deCollectTopic,
  ups,
  reply,
};
