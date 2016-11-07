import Vuex from 'vuex';
import Vue from 'vue';
import api from '../common/api';

Vue.use(Vuex);

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign*/
const state = {
  userinfo: {},
  pathRecord: [],
};

const mutations = {
  UPDATE_USERINFO(state, payload) {
    state.userinfo = payload.info;
  },
  CLEAR_USERINFO(state) {
    state.userinfo = {};
  },
  ADDPATHRECORD(state, payload) {
    state.pathRecord.push(payload.path);
  },
  REMOVEPATHRECORD({ pathRecord }, payload) {
    pathRecord.splice(pathRecord.indexOf(payload.path), 1);
  },
};

const actions = {
  updateUserInfo({ commit }, loginname) {
    return api.getUserInfo(loginname)
      .then(res => commit('UPDATE_USERINFO', { info: res.data.data }));
  },
};

const getters = {
  isLogin: state => !!state.userinfo.loginname,
  userinfo: state => state.userinfo,
  pathRecord: state => state.pathRecord,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
