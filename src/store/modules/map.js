const state = {
  rangingNum: 3,
  bigOrLitNum: null
}
const mutations = {
  setState(state, { key, value }) {
    state[key] = value
  }
}
const actions = {
  triggerRanging(context, number) {
    context.commit("setState", { key: "rangingNum", value: number })
  },
  triggerBigOrLit(context, number) {
    context.commit("setState", { key: "bigOrLitNum", value: number })
  }
}

export default {
  state, mutations, actions
}