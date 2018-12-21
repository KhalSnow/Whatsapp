import request from "@/utils/request"

export function selectedUser(data) {
    return request({
        url: '/users/selected',
        method: 'post',
        data
    })
}

export function makeChart(data) {
    return request({
        url: '/users/chart',
        method: 'post',
        data
    })
}

export function logIn(data) {
    return request({
        url: '/login/login',
        method: 'post',
        data
    })
}
