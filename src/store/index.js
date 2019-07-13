import Vue from "vue";
import Vuex from "vuex";
import init from "./modules/init"
import control from "./modules/control"
import eventAlert from "./modules/eventAlert"
import map from "./modules/map"
import tables from "./modules/tables"
import monitor from "./modules/monitor"
import command from "./modules/command"

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { control, init, eventAlert, map, tables, monitor, command }
})