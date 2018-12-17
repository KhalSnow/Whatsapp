import axios from "axios"
const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 30000,
    withCredentials: true
})

export default service
