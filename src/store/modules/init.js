const state = {
  clientWidth: 1280,
  clientHeight: 588,
  aspectRatio: 1280 / 588,
  value2D: false,
  value3D: true
};
const mutations = {
  setClientSize(state, value) {
    state.clientWidth = value.width;
    state.clientHeight = value.height;
    state.aspectRatio = value.width / value.height;
  },
  setState(state, { key, value }) {
    state[key] = value
  }
};
const actions = {
  getClientSize(context, value) {
    context.commit("setClientSize", value);
  },
  save23d(context, { d2, d3 }) {
    context.commit("setState", { key: 'value2D', value: d2 })
    context.commit("setState", { key: 'value3D', value: d3 })
  }
};
export default {
  state, mutations, actions
}