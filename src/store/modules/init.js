const state = {
  organizationId: 1,
  clientWidth: 1280,
  clientHeight: 588,
  aspectRatio: 1280 / 588,
  value23D: false
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
  save23d(context, value) {
    context.commit("setState", { key: 'value23D', value: value })
  }
};
export default {
  state, mutations, actions
}