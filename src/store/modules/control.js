const state = {
  layerNumber: 0
};
const mutations = {
  setState(state, { key, value }) {
    state[key] = value
  }
};
const actions = {
  layerChecked(context, number) {
    context.commit('setState', { key: "layerNumber", value: number });
  }
};

export default {
  state,
  mutations,
  actions
}