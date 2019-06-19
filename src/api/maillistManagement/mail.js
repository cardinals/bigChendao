import request from '@/axios/axios.js'

//条件查询通讯录人员列表
export function addressbookList(params) {
    return request({
        url: '/addressbook/list',
        method: 'get',
        params:params,
    })
}

//根据ID获取通讯录人员信息
export function addressbookInfo(params) {
    return request({
        url: '/addressbook/info/' + params,
        method: 'get',
    })
}
//保存通讯录人员信息
export function addressbookSave(data) {
    return request({
        url: '/addressbook/save',
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
//获取通讯录部门分组
export function deptgroupAlllist(params) {
    return request({
        url: '/deptgroup/all/list',
        method: 'get',
        params:params,
    })
}
//删除信息
export function addressbookDelete(data) {
    return request({
        url: '/addressbook/delete/'+ data,
        method: 'delete',
    })
}
//批量删除信息
export function addressbookDeletebatch(data) {
    return request({
        url: '/addressbook/deletebatch',
        method: 'delete',
        data: data,
    })
}
//-----------------------------------------------------以下是部门分组--------------------------------------------------------
//获取部门分组信息列表
export function deptgroupList(params) {
    return request({
        url: '/deptgroup/list',
        method: 'get',
        params:params,
    })
}
//根据ID获取部门分组信息
export function deptgroupInfo(params) {
    return request({
        url: '/deptgroup/info/' + params,
        method: 'get',
    })
}
//新增部门分组
export function deptgroupInsert(data) {
    return request({
        url: '/deptgroup/insert',
        method: 'post',
        data:data
    })
}
//修改部门分组信息
export function deptgroupUpdate(id,data) {
    return request({
        url: '/deptgroup/update/' + id,
        method: 'PUT',
        data:data
    })
}
//删除信息
export function deptgroupDelete(data) {
    return request({
        url: '/deptgroup/delete/'+ data,
        method: 'delete',
    })
}
//批量删除信息
export function deptgroupDeletebatch(data) {
    return request({
        url: '/deptgroup/deletebatch',
        method: 'delete',
        data: data,
    })
}
