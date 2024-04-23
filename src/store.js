// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '', // 存储登录用户名的状态
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
  },
});

