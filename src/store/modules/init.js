const state = {
  clientWidth: 1280,
  clientHeight: 588,
  aspectRatio: 1280 / 588
};
const mutations = {
  setClientSize(state, value) {
    state.clientWidth = value.width;
    state.clientHeight = value.height;
    state.aspectRatio = value.width / value.height;
  }
};
const actions = {
  getClientSize(context, value) {
    context.commit("setClientSize", value);
  }
};
export default {
  state, mutations, actions
}