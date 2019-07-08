import { dataOverView } from "@/api/control";
const state = {
  layerNumber: 0,
  hiddenValue: "隐藏浮窗"
};
const mutations = {
  setState(state, { key, value }) {
    state[key] = value;
  }
};
const actions = {
  layerChecked(context, number) {
    context.commit("setState", { key: "layerNumber", value: number });
  },
  saveHidden(context, hiddenValue) {
    context.commit("setState", { key: "hiddenValue", value: hiddenValue });
  },
  _dataOverView(context, { organizationId }) {
    dataOverView({ organizationId })
      .then(res => {
        console.log(res, "数据概览的返回数据")
      })
      .catch(err => {});
  }
};

export default {
  state,
  mutations,
  actions
};
