const state = {
  currentAddress: '',
  currentTime: ''
}
const  mutations = {
  setState(state, { key, value}) {
    state[key] = value
  }
}

const actions = {
  saveAddressTime(context, { currentAddress, currentTime }) {
    context.commit("setState", { key: "currentAddress", value: currentAddress });
    context.commit("setState", { key: "currentTime", value: currentTime })
  }
}

export default {
  state, mutations, actions
}