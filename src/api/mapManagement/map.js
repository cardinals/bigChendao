import request from '@/axios/axios.js'


//获取底图信息
export function basemapInfo(params) {
    return request({
        url: '/basemap/info',
        method: 'get',
        params:params,
    })
}

//获取图层信息列表
export function layerList(params) {
    return request({
        url: '/layer/list',
        method: 'get',
        params:params,
    })
}

//根据ID获取图层信息
export function layerInfo(params) {
    return request({
        url: '/layer/info/'+ params,
        method: 'get',
    })
}
//新增图层
export function layerInsert(data) {
    return request({
        url: '/layer/insert',
        method: 'post',
        data:data,
    })
}
//删除图层信息
export function layerDelete(data) {
    return request({
        url: '/layer/delete/'+ data,
        method: 'delete',
    })
}
//批量删除图层信息
export function layerDeletebatch(data) {
    return request({
        url: '/layer/deletebatch',
        method: 'delete',
        data:data
    })
}
