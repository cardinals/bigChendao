import {
  emergencyContact,
  nearbyPeople,
  nearbyCar,
  nearbyRadio,
  planGroup,
  planSelf,
  allPeopleId
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
      children: [ { name: '张领导' }, { name: '李领导' }, { name: '王领导' } ]
    }
  ]

};

const mutations = {
  setState(state, { key, value }) {
    state[key] = value;
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
  }
};

export default {
  state,
  mutations,
  actions
};
