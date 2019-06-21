const state = {
  alertBoolean: false
}

const mutations = {
  setState(state, { key, value }) {
    state[key] = value;
  }
}

const actions = {
  // passAlert: {
  //   tabNumber: 0,
  //   pointId: null,
  //   showAlert: true
  // }
  showAlert(context, passAlert) {
    const isBoolean = passAlert.showAlert;
    context.commit("setState", { key: "alertBoolean", value: isBoolean });
  }
}

export default {
  state, mutations, actions
}