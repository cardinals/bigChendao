import request from '@/axios/axios.js'


//---------------------------------------预案之预案-----------------------------------------------
//获取预案列表
export function emergencyplanList(params) {
    return request({
        url: '/emergencyplan/list',
        method: 'get',
        params:params,
    })
}
//删除预案列表
export function emergencyplanDelete(id) {
    return request({
        url: `/emergencyplan/delete/${id}`,
        method: 'delete'
    })
}
// 批量删除预案列表
export function emergencyplanDeletebatch(data) {
    return request({
        url: '/emergencyplan/deletebatch',
        method: 'delete',
        data:data,
    })
}
//新增预案
export function emergencyplanSave(data) {
    return request({
        url: '/emergencyplan/save',
        method: 'post',
        data:data,
    })
}
//根据ID获取预案信息
export function emergencyplanInfo(id) {
    return request({
        url: '/emergencyplan/info/'+id,
        method: 'get',
    })
}
//获取所有事件分组名称
export function eventgroupallList(params) {
    return request({
        url: '/eventgroup/all/list',
        method: 'get',
        params:params,
    })
}

//---------------------------------------预案之事件分组-----------------------------------------------

//获取预案事件分组列表
export function eventgroupList(params) {
    return request({
        url: '/eventgroup/list',
        method: 'get',
        params:params,
    })
}
//删除预案事件分组列表
export function eventgroupDelete(id) {
    return request({
        url: `/eventgroup/delete/${id}`,
        method: 'delete'
    })
}
// 批量删除预案事件分组列表
export function eventgroupDeletebatch(data) {
    return request({
        url: '/eventgroup/deletebatch',
        method: 'delete',
        data:data,
    })
}
//新增预案事件分组
export function eventgroupSave(data) {
    return request({
        url: '/eventgroup/insert',
        method: 'post',
        data:data,
    })
}
//修改预案事件分组
export function eventgroupUpdate(id,data) {
    return request({
        url: '/eventgroup/update/' + id,
        method: 'PUT',
        data:data,
    })
}
//根据ID获取预案事件分组信息
export function eventgroupInfo(id) {
    return request({
        url: '/eventgroup/info/'+id,
        method: 'get',
    })
}








//---------------------------------------预警-----------------------------------------------
//获取预警列表
export function earlywarningList(params) {
    return request({
        url: '/earlywarning/list',
        method: 'get',
        params:params,
    })
}
//删除预警列表
export function earlywarningDelete(id) {
    return request({
        url: `/earlywarning/delete/${id}`,
        method: 'delete'
    })
}
// 批量删除预警列表
export function earlywarningDeletebatch(data) {
    return request({
        url: '/earlywarning/deletebatch',
        method: 'delete',
        data:data,
    })
}
//新增预警
export function earlywarningSave(data) {
    return request({
        url: '/earlywarning/save',
        method: 'post',
        data:data,
    })
}
//根据ID获取预警信息
export function earlywarningInfo(id) {
    return request({
        url: '/earlywarning/info/'+id,
        method: 'get',
    })
}
//查找关联景点的list
export function baseinfoallList(params) {
    return request({
        url: '/baseinfo/all/list',
        method: 'get',
        params:params,
    })
}
//推荐方案
export function emergencyplanallList(params) {
    return request({
        url: '/emergencyplan/all/list',
        method: 'get',
        params:params,
    })
}
//获取所有部门分组信息
export function deptgroupallList(params) {
    return request({
        url: '/deptgroup/all/list',
        method: 'get',
        params:params,
    })
}
//不分页查询全部通讯录人员列表
export function addressbookgroupalllist(params) {
    return request({
        url: '/addressbook/all/list',
        method: 'get',
        params:params,
    })
}