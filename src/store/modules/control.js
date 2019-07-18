import { dataOverView, eventList, dataOverview } from "@/api/control";
import { homepageDateoverview } from "@/api/console/console.js";

function deepMerge(obj1, obj2) {
  let key;
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    obj1[key] =
      obj1[key] && obj1[key].toString() === "[object Object]"
        ? deepMerge(obj1[key], obj2[key])
        : (obj1[key] = obj2[key]);
  }
  return obj1;
}

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
  ],
  currentEventId: null,
  currentGroupData: null,
  equipmentList: [],
  resourcesList: []
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
        console.log(res, "管控-数据概览的返回数据");
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
              happenedTime: item.happenedTime,
              id: item.eventId,
              groupId: item.groupId,
              groupName: item.groupName
            })
          })
          data.emergencyList.map(item => {
            _emergencyList.push({
              number: item.eventCode,
              desc: item.eventDescription,
              handle: item.eventState == 0 ? '待处理' : item.eventState == 1 ? '处理中' : '已处理',
              link: "url(" + require('../../assets/control/position.png') + ")",
              areaId: item.areaId,
              eventAddr: item.eventAddr,
              happenedTime: item.happenedTime,
              id: item.eventId,
              groupId: item.groupId,
              groupName: item.groupName
            })
          })
          data.otherList.map(item => {
            _otherList.push({
              number: item.eventCode,
              desc: item.eventDescription,
              handle: item.eventState == 0 ? '待处理' : item.eventState == 1 ? '处理中' : '已处理',
              link: "url(" + require('../../assets/control/position.png') + ")",
              areaId: item.areaId,
              eventAddr: item.eventAddr,
              happenedTime: item.happenedTime,
              id: item.eventId,
              groupId: item.groupId,
              groupName: item.groupName
            })
          })
          context.commit("setState", { key: "alarmList", value: _alarmList })
          context.commit("setState", { key: "emergencyList", value: _emergencyList })
          context.commit("setState", { key: "otherList", value: _otherList })
        }
      })
      .catch();
  },
  saveCurrentEventId(context, {id, groupId, groupName}) {
    context.commit("setState", { key: "currentEventId", value: id })
    context.commit("setState", { key: "currentGroupData", value: {
        groupId: groupId,
        groupName: groupName
      } })
  },
  _homepageDateoverview(context, { organizationId, deviceData, resourceData }) {
    homepageDateoverview({ organizationId })
      .then((res) => {
        const data = res.data.data;
        console.log(data, '设备')
        const _equipmentList = data.equipmentList,
          _resourcesList = data.resourcesList;
        _equipmentList.every((val) => {
          let hasDefault = false;
          deviceData.every((val1, idx1) => {
            if (val.name === val1.name) {
              hasDefault = true;
              val = deepMerge(val, val1)
              val['ratio'] = val['statusCount']
              deviceData.splice(idx1, 1)
              return false
            }
            return true
          })
          if (!hasDefault) {
            val = deepMerge(val, {
              link: "url(" + require("../../assets/control/layer1.png") + ")",
                link1: "url(" + require("../../assets/control/layer1x.png") + ")",
                isActive: true,
                width: "15%",
                height: "100%",
                textColor: "#fff",
                textColor1: "#fdc43b"
            })
            val['ratio'] = val['count']
          }
          return true
        })
        _resourcesList.every((val) => {
          let hasDefault = false;
          resourceData.every((val1, idx1) => {
            if (val.name === val1.name) {
              hasDefault = true;
              val = deepMerge(val, val1)
              val['ratio'] = val['count']
              deviceData.splice(idx1, 1)
              return false
            }
            return true
          })
          if (!hasDefault) {
            val = deepMerge(val, {
              link: "url(" + require("../../assets/control/layer5.png") + ")",
              isActive: true,
              width: "15%",
              height: "100%",
              textColor: "#fff",
            },)
            val['ratio'] = val['count']
          }
          return true
        })
        context.commit("setState", { key: "equipmentList", value: _equipmentList })
        context.commit("setState", { key: "resourcesList", value: _resourcesList })
        console.log(res, "首页资源")
      })
  }
};

export default {
  state,
  mutations,
  actions
};
