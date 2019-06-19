import request from '@/axios/axios.js'


//获取设备资源管理信息列表
export function baseinfoList(params) {
    return request({
        url: '/baseinfo/list',
        method: 'get',
        params:params,
    })
}
//tab的切换菜单
export function baseinfolayertypelist(params) {
    return request({
        url: '/baseinfo/layertypelist',
        method: 'get',
        params:params,
    })
}
//新增
export function baseinfoInsert(data) {
    return request({
        url: '/baseinfo/insert',
        method: 'post',
        data:data,
    })
}
//获取通讯录区域分组
export function areagroupGroupalllist(params) {
    return request({
        url: '/areagroup/all/list',
        method: 'get',
        params:params,
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
