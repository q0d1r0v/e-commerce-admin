const state = {
  is_login: false,
};
const getters = {
  data: (state) => state.is_login,
};
const mutations = {
  CHANGE_VALUE: (state) => {
    state.is_login = true;
  },
};
const actions = {
  isLogin({ commit }) {
    commit("CHANGE_VALUE");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
