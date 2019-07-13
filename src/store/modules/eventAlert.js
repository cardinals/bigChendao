import {
  emergencyContact,
  nearbyPeople,
  nearbyCar,
  nearbyRadio,
  planGroup,
  planSelf,
  allPeopleId,
  SubmitDisposal
} from "@/api/alert";
const state = {
  alertBoolean: false,
  tabNumber: 0,
  planOrmanOrNoNumber: 5,
  showNewsAlert: false,
  emergencyContact: [{ name: "小飞怪1", tel: "13765678765" }],
  nearbyPeople: [{ name: "附近人1", tel: "13765678765" }],
  nearbyCar: [{ name: "车辆1", tel: "13765678765" }],
  nearbyRadio: [{ name: "西湖广播1", tel: "GB0010001", status: 0 }],
  planGroup: [],
  planGroupId: null,
  planSelf: [],
  departmentMens: [
    {
      name: '领导组',
      ischeck: false,
      children: [ { name: '张领导', id: 1, ischeck: false }, { name: '李领导', id: 1, ischeck: false } ]
    }
  ],
  // 点处置要提交的参数
  disposalParameters: {
    planId: null,
    sendPeopleId: [],
    message: "",
    eventState: null
  }

};

const mutations = {
  setState(state, { key, value }) {
    state[key] = value;
  },
  setDisposal(state, { key, value }) {
    state['disposalParameters'][key] = value
  },
  pushNearby(state, { key, value }) {
    state['disposalParameters'][key].push(value)
  },
  popNearby(state, { key, value }) {
    state['disposalParameters'][key].pop(value)
  },
  pushsendId(state, { key, value }) {
    state['disposalParameters'][key] = state['disposalParameters'][key].concat(value)
  },
  // 清空参数
  clearDisposalParam(state) {
    state['disposalParameters']['planId'] = '';
    state['disposalParameters']['sendPeopleId'] = '';
    state['disposalParameters']['message'] = '';
    state['disposalParameters']['eventState'] = ''
    
  }
};

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
    context.commit("setState", { key: "planOrmanOrNoNumber", value: number });
  },
  showNewsAlert(context, passAlert) {
    context.commit("setState", { key: "showNewsAlert", value: passAlert });
  },
  // 紧急联系人
  _emergencyContact(context, { organizationId, areaId, groupId, layerTypeId }) {
    // 附近联系人
    emergencyContact({ organizationId, areaId })
      .then(res => {
        console.log(res, "紧急联系人");
        if (res.status == 200) {
          let emergencyContact = [];
          res.data.data.map(item => {
            emergencyContact.push({
              name: item.name,
              tel: item.phone
            });
          });
          context.commit("setState", {
            key: "emergencyContact",
            value: emergencyContact
          });
        }
      })
      .catch();
    // 附近人员
    nearbyPeople({ organizationId, areaId, groupId })
      .then(res => {
        console.log(res, "附近人员");
        if (res.status == 200) {
          let nearbyPeople = [];
          res.data.data.map(item => {
            nearbyPeople.push({
              name: item.name,
              tel: item.phone
            });
          });
          context.commit("setState", {
            key: "nearbyPeople",
            value: nearbyPeople
          });
        }
      })
      .catch();
    // 附近资源-车辆
    nearbyCar({ organizationId, areaId, groupId })
      .then(res => {
        console.log(res, "附近车辆");
        if (res.status == 200) {
          let nearbyCar = [];
          res.data.data.map(item => {
            nearbyCar.push({
              name: item.driver,
              tel: item.driverPhone
            });
          });
          context.commit("setState", { key: "nearbyCar", value: nearbyCar });
        }
      })
      .catch();
    // 附近广播
    nearbyRadio({ organizationId, groupId, layerTypeId })
      .then(res => {
        console.log(res, "附近广播");
        if (res.status == 200) {
          let nearbyRadio = [];
          res.data.data.map(item => {
            nearbyRadio.push({
              name: item.name,
              tel: item.equipmentCode,
              status: item.status
            });
          });
          context.commit("setState", {
            key: "nearbyRadio",
            value: nearbyRadio
          });
        }
      })
      .catch();
  },
  // 预案分组
  _planGroup(context, { organizationId }) {
    planGroup({ organizationId })
      .then(res => {
        console.log(res, '预案分组')
        if (res.status == 200) {
          const planGroup = res.data.data;
          context.commit("setState", { key: "planGroup", value: planGroup });  
        }
      })
      .catch();
  },
  // 保存预案分组id
  saveplanGroupId(context, groupId) {
    context.commit("setState", { key: "planGroupId", value: groupId })
  },
  // 预案
  _planSelf(context, groupId) {
    planSelf(groupId)
      .then(res => {
        console.log(res, '预案')
        if (res.status == 200) {
          const planSelf = res.data.data;
          context.commit("setState", { key: "planSelf", value: planSelf });
        }
      })
      .catch();
  },
  // 各种部门人员的id
  _allPeopleId(context, { organizationId }) {
    allPeopleId({ organizationId }).then(res => {
      console.log(res, '各种部门')
      if (res.status == 200) {
        const data = res.data.data;
        let department = [], departmentSet = [], endData = [];
        data.map(item => {
          department.push(item.deptName)
        })
        departmentSet = Array.from(new Set(department));
        console.log(departmentSet, '部门集合去重')
        departmentSet.map(item => {
          endData.push({
            name: item,
            ischeck: false,
            children: data.map(e => {
              return {
                name: e.deptName == item ? e.name : '',
                id: e.deptName == item ? e.id : '',
                ischeck: e.deptName == item ? false : ''
              }
            }).filter(e => e.name != '')
          })
        })
        console.log(endData, '最终数据')
        context.commit("setState", { key: "departmentMens", value: endData })
      }
    }).catch()
  },
  // 提交【处置】预案id
  _saveDisposalParamPlanId(context, planId) {
    context.commit("setDisposal", { key: "planId", value: planId });
  },
  // push【处置】联系人id数组
  // _saveDisposalParamSendId(context, sendPeopleId) {
  //   context.commit("setDisposal", { key: "sendPeopleId", value: sendPeopleId });
  // },
  _saveDisposalParamSendId(context, sendPeopleId) {
    context.commit("pushsendId", { key: "sendPeopleId", value: sendPeopleId });
  },
  // push附近
  _pushNearby(context, value) {
    context.commit("pushNearby", { key: "sendPeopleId", value: value })
  },
  // pop附近
  _popNearby(context, value) {
    context.commit("popNearby", { key: "sendPeopleId", value: value })
  },
  // 提交【处置】信息
  _saveDisposalParamMassage(context, message) {
    context.commit("setDisposal", { key: "message", value: message })
  },
  // 提交【处置】事件状态
  _saveDisposalParamStatus(context, eventStatus) {
    context.commit("setDisposal", { key: "eventState", value: eventStatus });
  },
  // 处置提交
  _SubmitDisposal(context, { id, data }) {
    SubmitDisposal(id, data).then(res => {
      console.log(res, "处置提交结果")
      if (res.status == 200) {
        // 提交完清空参数
        context.commit("clearDisposalParam")
      }
      // this.$store.dispatch("clearDisposalParam");
    }).catch()
  },
};

export default {
  state,
  mutations,
  actions
};
