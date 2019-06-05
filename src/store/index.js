import Vue from "vue";
import Vuex from "vuex";
import init from "./modules/init"
import home from "./modules/home"

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { home, init }
})