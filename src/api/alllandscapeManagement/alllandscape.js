import request from '@/axios/axios.js'

//获取全景信息列表
export function panoramicList(params) {
    return request({
        url: '/panoramic/list',
        method: 'get',
        params:params,
    })
}
//根据ID获取全景信息
export function panoramicInfo(params) {
    return request({
        url: '/panoramic/info/' + params,
        method: 'get',
    })
}
//保存全景信息
export function panoramicSave(data) {
    return request({
        url: '/panoramic/insert',
        method: 'post',
        data:data,
    })
}
//更新全景信息
export function panoramicUpdate(id,data) {
    return request({
        url: '/panoramic/update/'+ id,
        method: 'PUT',
        data:data,
    })
}
//删除全景信息
export function panoramicDelete(data) {
    return request({
        url: '/panoramic/delete/'+ data,
        method: 'delete',
    })
}
//批量删除全景信息
export function panoramicDeletebatch(data) {
    return request({
        url: '/panoramic/deletebatch',
        method: 'delete',
        data: data,
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