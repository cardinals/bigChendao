const state = {
  monitorBoolean: false,
  partValue: 1
}
const mutations = {
  setState(state, { key, value }) {
    state[key] = value
  }
}

const actions = {
  saveMonitorBoolean(context, mbValue) {
    context.commit("setState", { key: "monitorBoolean", value: mbValue })
  },
  savePartNum(context, part) {
    context.commit("setState", { key: "partValue", value: part })
  }
}

export default {
  state, mutations, actions
}