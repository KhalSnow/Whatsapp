// import axios from 'axios'
// import store from './store'
// import router from './router' 

// var instance = axios.create({
//     timeout: 5000,
//     headers: { 'Content-type': 'application/json;charset=UTF-8' }
// })

// instance.interceptors.request.use(
//     config => {
//         if (store.state.token) {
//             config.headers.Authorization = 'token $ {store.state.token}'
//         }
//         return config
//     }
// )

// instance.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     router.replace({
//                         path: 'login',
//                         query: { redirect: router.currentRoute.fullPath }
//                     })
//                 }
//             }
//         return Promise.reject(error.response)
//     }
// )

// export default {
//     userRegister(data) {
//         return instance.post('/user/register', data)
//     },
//     userLogin(data) {
//         return instance.post('/user/login', data)
//     },
//     getUser() {
//         return instance.get('/user/user')
//     },
//     delUser() {
//         return instance.post('/user/delUser', data)
//     }
// }