import Vue from "vue";
import Vuex from "vuex";
import init from "./modules/init"
import control from "./modules/control"

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { control, init }
})