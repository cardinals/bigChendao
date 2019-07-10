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