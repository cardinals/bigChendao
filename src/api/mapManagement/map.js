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

//修改图层
export function layerUpdate(id,data) {
    return request({
        url: '/layer/update/' + id,
        method: 'put',
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
//http://localhost:8081/layertype/listbyparentid?organizationId=1&parentId=0
//关联
export function layertypeListbyparentid(params) {
    return request({
        url: '/layertype/listbyparentid',
        method: 'get',
        params:params,
    })
}