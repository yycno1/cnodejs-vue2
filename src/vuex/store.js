import Vuex from 'vuex';
import Vue from 'vue';
import api from '../common/api';

Vue.use(Vuex);

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign*/
const state = {
  user: {
    info: {},
    token: '',
  },
  pathRecord: [],
  transitionStatus: {
    enterPath: '',
    leavePath: '',
  },
};

const mutations = {
  UPDATE_USERINFO({ user }, payload) {
    user.info = payload.info;
  },
  CLEAR_USER({ user }) {
    user.info = {};
    user.token = '';
  },
  UPDATE_TOKEN({ user }, payload) {
    user.token = payload.token;
  },
  ADDPATHRECORD(state, payload) {
    state.pathRecord.push(payload.path);
  },
  REMOVEPATHRECORD({ pathRecord }, payload) {
    pathRecord.splice(pathRecord.indexOf(payload.path), 1);
  },
  UPDATE_TRANSITION_STATUS({ transitionStatus }, payload) {
    transitionStatus = Object.assign(transitionStatus, payload);
  },
};

const actions = {
  updateUserInfo({ commit }, loginname) {
    return api.fetchUserInfo(loginname)
      .then(res => commit('UPDATE_USERINFO', { info: res.data.data }));
  },
};

const getters = {
  isLogin: state => !!state.user.token,
  userinfo: state => state.user.info,
  token: state => state.user.token,
  pathRecord: state => state.pathRecord,
  transitionStatus: state => state.transitionStatus,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
