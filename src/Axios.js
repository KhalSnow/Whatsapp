import axios from 'axios'
import store from './store'
import router from './router' 

var instance = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 15000,
    headers: { 'Content-type': 'application/json;charset=UTF-8' },
    withCredentials: true
})

// http request 拦截器
instance.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = 'token $ {store.state.token}'
        }
        return config
    },
    err => {
        return Promise.reject(err)
    },
)

// http response 拦截器
instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                }
            }
        return Promise.reject(error.response.data)
    }
)

export default instance
