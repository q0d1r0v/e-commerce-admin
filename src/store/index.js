import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/auth/login";
import addDialog from "./modules/add-dialog/dialog";
import items from "./modules/items/items";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    addDialog,
    items,
  },
});
