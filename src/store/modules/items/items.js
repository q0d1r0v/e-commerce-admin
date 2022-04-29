import axios from "../../../axios";

const state = {
  data: {
    items: [],
  },
};
const getters = {
  items: (state) => {
    return state.data.items;
  },
};
const mutations = {
  SET_ITEMS: (state, data) => {
    state.data.items = data;
  },
};
const actions = {
  async searchItems({ commit }, params) {
    try {
      const response = await axios.get("products/search", params);
      commit("SET_ITEMS", response.data);
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async getItems({ commit }) {
    try {
      const response = await axios.get("products/get-all");
      commit("SET_ITEMS", response.data);
      return Promise.resolve(response.data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
