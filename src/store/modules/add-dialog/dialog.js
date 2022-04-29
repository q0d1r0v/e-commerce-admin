const state = {
  data: {
    show: false,
  },
  formData: {
    item_id: null,
    editing: false,
    title: "",
    type: "",
    images: [],
    additional_data: "",
  },
};
const getters = {
  show: (state) => {
    return state.data.show;
  },
  formData: (state) => {
    return state.formData;
  },
};
const mutations = {
  SHOW_DIALOG: (state) => {
    state.formData.editing = false;
    state.data.show = true;
    state.formData.title = "";
    state.formData.type = "";
    state.formData.images = [];
    state.formData.additional_data = "";
  },
  SHOW_EDIT_DIALOG: (state, data) => {
    state.formData.editing = true;
    state.data.show = true;
    state.formData.item_id = data.id;
    state.formData.title = data.product_name;
    state.formData.type = data.product_type;
    state.formData.additional_data = data.product_additional;
    state.formData.images = [];
  },
  HIDE_DIALOG: (state) => {
    state.data.show = false;
  },
};
const actions = {
  showDialog({ commit }) {
    commit("SHOW_DIALOG");
  },
  showEditDialog({ commit }, data) {
    commit("SHOW_EDIT_DIALOG", data);
  },
  hideDialog({ commit }) {
    commit("HIDE_DIALOG");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
