import { dataOverView, eventList } from "@/api/control";
const state = {
  layerNumber: 0,
  hiddenValue: "隐藏浮窗",
  alarmList: [
    {
      number: '0006',
      desc: '游客掉进西湖6',
      handle: '待处理',
      link: "url(" + require('../../assets/control/position.png') + ")",
      areaId: null
    }
  ],
  emergencyList: [
    {
      number: '0006',
      desc: '游客掉进西湖6',
      handle: '待处理',
      link: "url(" + require('../../assets/control/position.png') + ")",
      areaId: null
    }
  ],
  otherList: [
    {
      number: '0006',
      desc: '游客掉进西湖6',
      handle: '待处理',
      link: "url(" + require('../../assets/control/position.png') + ")",
      areaId: null
    }
  ]
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
        console.log(res, "数据概览的返回数据");
      })
      .catch(err => {});
  },
  _eventList(context, { organizationId }) {
    eventList({ organizationId })
      .then(res => {
        console.log(res, "右侧事件列表")
        if (res.status == 200) {
          const data = res.data.data;
          let _alarmList = [], _emergencyList = [], _otherList = [];
          data.alarmList.map(item => {
            _alarmList.push({
              number: item.eventCode,
              desc: item.eventDescription,
              handle: item.eventState == 0 ? '待处理': item.eventState == 1 ? '处理中': '已处理',
              link: "url(" + require('../../assets/control/position.png') + ")",
              areaId: item.areaId,
              eventAddr: item.eventAddr,
              happenedTime: item.happenedTime
            }) 
          })
          data.emergencyList.map(item => {
            _emergencyList.push({
              number: item.eventCode,
              desc: item.eventDescription,
              handle: item.eventState == 0 ? '待处理' : item.eventState == 1 ? '处理中' : '已处理',
              link: "url(" + require('../../assets/control/position.png') + ")",
              areaId: item.areaId
            })
          })
          data.otherList.map(item => {
            _otherList.push({
              number: item.eventCode,
              desc: item.eventDescription,
              handle: item.eventDescription == 0 ? '待处理' : item.eventState == 1 ? '处理中' : '已处理',
              link: "url(" + require('../../assets/control/position.png') + ")",
              areaId: item.areaId
            })
          })
          context.commit("setState", { key: "alarmList", value: _alarmList })
          context.commit("setState", { key: "emergencyList", value: _emergencyList })
          context.commit("setState", { key: "otherList", value: _otherList })
        }
      })
      .catch();
  }
};

export default {
  state,
  mutations,
  actions
};
