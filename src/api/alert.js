import request from "@/axios/axios.js"

// 紧急联系人
export function emergencyContact(params) {
  return request({
    url: 'addressbook/listbyareaid',
    method: "GET",
    params
  })
}
// 附近人员
export function nearbyPeople(params) {
  return request({
    url: "personnel/listbygroupid",
    method: "GET",
    params
  })
}
//  附近资源-车辆
export function nearbyCar(params) {
  return request({
    url: 'car/listbygroupid',
    method: "GET",
    params
  })
}

// 附近广播
export function nearbyRadio(params) {
  return request({
    url: 'baseinfo/all/list',
    method: "GET",
    params
  })
}

// 下拉-预案分组接口
export function planGroup(params) {
  return request({
    url: 'eventgroup/all/list',
    method: "GET",
    params
  })
}

// 下拉-预案
export function planSelf(params) {
  return request({
    url: `emergencyplan/infobygroupid/${params}`,
    method: "GET"
  })
}
// 各种分组的人员
export function allPeopleId(params) {
  return request({
    url: 'addressbook/all/list',
    method: "GET",
    params
  })
}

// 提交【处置】
export function SubmitDisposal(id, data) {
  return request({
    url: `eventmanagement/update/${id}`,
    method: "PUT",
    data
  })
}