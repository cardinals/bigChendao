const state = {
  layerNumber: 0,
  hiddenValue: '隐藏浮窗'
};
const mutations = {
  setState(state, { key, value }) {
    state[key] = value
  }
};
const actions = {
  layerChecked(context, number) {
    context.commit('setState', { key: "layerNumber", value: number });
  },
  saveHidden(context, hiddenValue) {
    context.commit('setState', { key: 'hiddenValue', value: hiddenValue })
  }
};

export default {
  state,
  mutations,
  actions
}