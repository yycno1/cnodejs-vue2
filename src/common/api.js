import Vue from 'vue';

const root = 'https://cnodejs.org/api';
// const token = '103a0652-dfa2-4b50-b1ad-27b3b2a0f5b8';

function fetchTopic({ page = 1, limit = 10, tab = 'all' }) {
  const url = `${root}/v1/topics`;
  return Vue.http.get(url, {
    params: {
      page,
      limit,
      tab,
    },
  });
}

function fetchTopicDetail(topicId) {
  const url = `${root}/v1/topic/${topicId}`;
  return Vue.http.get(url);
}

function login(accesstoken) {
  const url = `${root}/v1/accesstoken`;
  const postData = {
    accesstoken,
  };
  return Vue.http.post(url, postData);
}

function getUserInfo(username) {
  const url = `${root}/v1/user/${username}`;
  return Vue.http.get(url);
}

export default {
  fetchTopic,
  fetchTopicDetail,
  login,
  getUserInfo,
};
