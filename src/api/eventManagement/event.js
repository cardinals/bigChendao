import request from '@/axios/axios.js'

//获取事件列表
export function eventmanagementlList(params) {
    return request({
        url: '/eventmanagement/list',
        method: 'get',
        params:params,
    })
}
//删除事件列表
export function eventmanagementDelete(id) {
    return request({
        url: `/eventmanagement/delete/${id}`,
        method: 'delete'
    })
}
// 批量删除事件列表
export function eventmanagementDeletebatch(data) {
    return request({
        url: '/eventmanagement/deletebatch',
        method: 'delete',
        data:data,
    })
}
//新增事件
export function eventmanagementInsert(data) {
    return request({
        url: '/eventmanagement/insert',
        method: 'post',
        data:data,
    })
}
//获取所有事件分组列表
export function eventgroupAllList(params) {
    return request({
        url: '/eventgroup/all/list',
        method: 'get',
        params:params,
    })
}
//根据ID获取事件信息
export function eventmanagementInfo(id) {
    return request({
        url: '/eventmanagement/info/'+id,
        method: 'get',
    })
}
//查询近一周事件信息
export function eventmanagementStatsanal(params) {
    return request({
        url: '/eventmanagement/statsanal',
        method: 'get',
        params:params,
    })
}
//查询发送对象
//192.168.1.117:8081/addressbook/list?organizationId=1&sendPeopleId=1,2,3
export function addressbookList(params) {
    return request({
        url: '/addressbook/list',
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





