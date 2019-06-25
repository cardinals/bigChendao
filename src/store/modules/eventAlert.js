const state = {
  alertBoolean: false,
  tabNumber: 0,
  planOrmanOrNoNumber: 3
}

const mutations = {
  setState(state, { key, value }) {
    state[key] = value;
  }
}

const actions = {
  // passAlert: {
  //   pointId: null,
  //   showAlert: true
  // }
  showAlert(context, passAlert) {
    const isBoolean = passAlert.showAlert;
    context.commit("setState", { key: "alertBoolean", value: isBoolean });
  },
  saveTabNumber(context, tabNumber) {
    context.commit("setState", { key: "tabNumber", value: tabNumber });
  },
  savePlanOrmanOrNo(context, number) {
    context.commit("setState", { key: "planOrmanOrNoNumber", value: number })
  }
}

export default {
  state, mutations, actions
}