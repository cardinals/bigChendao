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
//获取区域分组
export function areagroupGroupalllist(params) {
    return request({
        url: '/areagroup/all/list',
        method: 'get',
        params:params,
    })
}
//删除设备资源管理信息
export function baseinfoDelete(id) {
    return request({
        url: `/baseinfo/delete/${id}`,
        method: 'delete'
    })
}

// 批量删除设备资源管理信息
export function baseinfoDeletebatch(data) {
    return request({
        url: '/baseinfo/deletebatch',
        method: 'delete',
        data:data,
    })
}
//修改设备资源管理信息
export function baseinfoUpdate(id,data) {
    return request({
        url: '/baseinfo/update/'+id,
        method: 'PUT',
        data:data
    })
}
//根据ID获取设备资源管理信息
export function baseinfoInfo(id,data) {
    return request({
        url: '/baseinfo/info/'+id,
        method: 'get',
    })
}