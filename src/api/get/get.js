import request from "@/utils/request"

export function selectedUser(data) {
    return request({
        url: '/users/selected',
        method: 'post',
        data
    })
}

export function selectedPage(data) {
    return request({
        url: '/users/page',
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

export function signUp(data) {
    return request({
        url: '/signup/signup',
        method: 'post',
        data
    })
}
