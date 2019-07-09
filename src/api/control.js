import request from "@/axios/axios.js"

// 数据概览
export function dataOverView(params) {
  return request({
    method: "GET",
    url: "homepage/management/dateoverview",
    params
  })
}

// 右侧事件列表
export function eventList(params) {
  return request({
    method: "GET",
    url: "homepage/management/geteventlist",
    params
  })
}