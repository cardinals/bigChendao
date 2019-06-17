import request from '@/axios/axios.js'


//获取区域分组信息列表
export function areagroupList(params) {
    return request({
        url: '/areagroup/list',
        method: 'get',
        params:params,
    })
}
//新增图层
export function areagroupInsert(data) {
    return request({
        url: '/areagroup/insert',
        method: 'post',
        data:data,
    })
}

//删除区域分组信息
export function areagroupDelete(id) {
    return request({
        url: `/areagroup/delete/${id}`,
        method: 'delete'
    })
}

// 批量删除区域分组信息
export function addressbookDeletebatch(data) {
    return request({
        url: '/areagroup/deletebatch',
        method: 'delete',
        data:data,
    })
}
//修改区域分组信息
export function areagroupUpdate(id,data) {
    return request({
        url: '/areagroup/update/'+id,
        method: 'PUT',
        data:data
    })
}
