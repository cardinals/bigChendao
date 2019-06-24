import request from '@/axios/axios.js'

//管控首页数据概况
export function homepageDateoverview(params) {
    return request({
        url: '/homepage/management/dateoverview',
        method: 'get',
        params:params,
    })
}