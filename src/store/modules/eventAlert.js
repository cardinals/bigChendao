import { emergencyContact, nearbyPeople, nearbyCar } from "@/api/alert";
const state = {
  alertBoolean: false,
  tabNumber: 0,
  planOrmanOrNoNumber: 5,
  showNewsAlert: false,
  emergencyContact: [{ name: "小飞怪1", tel: "13765678765" }],
  nearbyPeople: [{ name: "附近人1", tel: "13765678765" }],
  nearbyCar: [{ name: "车辆1", tel: "13765678765" }]
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
  _emergencyContact(context, { organizationId, areaId, groupId }) {
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
        console.log(res, "附近人员")
        if (res.status == 200) {
          let nearbyPeople = [];
          res.data.data.map(item => {
            nearbyPeople.push({
              name: item.name,
              tel: item.phone
            })
          })
          context.commit("setState", { key: "nearbyPeople", value: nearbyPeople});
        }
      })
      .catch();
    // 附近资源-车辆
    nearbyCar({ organizationId, areaId, groupId })
      .then(res => {
        console.log(res, "附近车辆")
        if (res.status == 200) {
          let nearbyCar = [];
          res.data.data.map(item => {
            nearbyCar.push({
              name: item.driver,
              tel: item.driverPhone
            })
          })
          context.commit("setState", { key: "nearbyCar", value: nearbyCar })
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
