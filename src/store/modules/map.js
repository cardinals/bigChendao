const state = {
  rangingNum: 3
}
const mutations = {
  setState(state, { key, value }) {
    state[key] = value
  }
}
const actions = {
  triggerRanging(context, number) {
    context.commit("setState", { key: "rangingNum", value: number })
  }
}

export default {
  state, mutations, actions
}