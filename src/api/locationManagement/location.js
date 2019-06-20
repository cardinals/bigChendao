import request from '@/axios/axios.js'

//-------------------------------------------以下人员管理---------------------------------------------------

//获取人员列表
export function personnelList(params) {
    return request({
        url: '/personnel/list',
        method: 'get',
        params:params,
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
//删除人员信息
export function personnelDelete(id) {
    return request({
        url: `/personnel/delete/${id}`,
        method: 'delete'
    })
}
// 批量人员信息
export function personnelDeletebatch(data) {
    return request({
        url: '/personnel/deletebatch',
        method: 'delete',
        data:data,
    })
}
//新增人员
export function personnelSave(data) {
    return request({
        url: '/personnel/save',
        method: 'post',
        data:data,
    })
}
//根据ID获取人员信息
export function personnelInfo(id) {
    return request({
        url: '/personnel/info/'+id,
        method: 'get',
    })
}
//获取所有通讯录部门分组信息
export function deptgroupAllList(params) {
    return request({
        url: '/deptgroup/all/list',
        method: 'get',
        params:params,
    })
}

//这个没用上现在
//根据groupId获取人员分组信息
export function personnelListbygroupid(params) {
    return request({
        url: '/personnel/listbygroupid',
        method: 'get',
        params:params,
    })
}

//-------------------------------------------以下车辆管理---------------------------------------------------
//获取车辆列表
export function carList(params) {
    return request({
        url: '/car/list',
        method: 'get',
        params:params,
    })
}
//删除车辆信息
export function carDelete(id) {
    return request({
        url: `/car/delete/${id}`,
        method: 'delete'
    })
}
// 批量删除车辆信息
export function carDeletebatch(data) {
    return request({
        url: '/car/deletebatch',
        method: 'delete',
        data:data,
    })
}
//新增车辆信息
export function carSave(data) {
    return request({
        url: '/car/save',
        method: 'post',
        data:data,
    })
}
//根据ID获取车辆信息
export function carInfo(id) {
    return request({
        url: '/car/info/'+id,
        method: 'get',
    })
}



