import { dataOverview } from "@/api/command.js"
const state = {
  eventDateList: [],
  carPersonList: [],
  tableAlertValue: null
}
const mutations = {
  setState(state, { key, value}) {
    state[key] = value;
  }
}
const actions = {
  _dataOverview(context, { organizationId }) {
    dataOverview({ organizationId }).then(res => {
      console.log(res, '指挥里的数据概览')
      if (res.status == 200) {
        let f_eventList = res.data.data.eventList;
        let f_carList = res.data.data.carList;
        let f_person = res.data.data.personnelList;
        let _eventDateList = [
          {
            title: "总数量",
            num: 66,
            data: [
              { text: "待处理", num: 0 },
              { text: "处置中", num: 0 },
              { text: "已完结", num: 66 }
            ],
            width: "23%"
          },
          {
            title: "时间分组",
            data: [
              { text: "应急", num: 30 },
              { text: "告警", num: 26 },
              { text: "其他", num: 16 }
            ],
            width: "18%"
          }
        ];
        let _carPersonList = [
          {
            text1: "人员",
            num1: 66,
            text2: "",
            num2: '',
            check: "查看>>",
            back: "transparent",
            border: 'none'
          },
          {
            text1: "车辆",
            num1: 46,
            text2: "在线车辆",
            num2: 16,
            check: "查看>>"
          }
        ];
        _eventDateList[0].num = f_eventList[0].eventCount;
        _eventDateList[0].data[0].num = f_eventList[0].待处置;
        _eventDateList[0].data[1].num = f_eventList[0].处置中;
        _eventDateList[0].data[2].num = f_eventList[0].已完结;
        _eventDateList[1].data[0].num = f_eventList[0].应急;
        _eventDateList[1].data[1].num = f_eventList[0].告警;
        _eventDateList[1].data[2].num = f_eventList[0].其他;

        _carPersonList[0].num1 = f_person[0].personnelCount;
        _carPersonList[1].num1 = f_carList[0].carCount;
        _carPersonList[1].num2 = f_carList[0].online;
        context.commit("setState", { key: "eventDateList", value: _eventDateList })
        context.commit("setState", { key: "carPersonList", value: _carPersonList })
      }
    }).catch()
  },
  saveTableAlertValue(context, value) {
    context.commit("setState", { key: "tableAlertValue", value: value });
  }
}

export default {
  state, mutations, actions
}