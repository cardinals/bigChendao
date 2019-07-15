import request from "@/axios/axios.js"

export function dataOverview(params) {
  return request({
    url: 'homepage/command/dateoverview',
    method: "GET",
    params
  })
}