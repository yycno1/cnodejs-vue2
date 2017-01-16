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
  direction: 'forword',
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
  UPDATE_TRANSITION_STATUS({ transitionStatus }, payload) {
    transitionStatus = Object.assign(transitionStatus, payload);
  },
  UPDATE_DIRECTION(state, direction) {
    state.direction = direction;
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
  transitionStatus: state => state.transitionStatus,
  direction: state => state.direction,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
