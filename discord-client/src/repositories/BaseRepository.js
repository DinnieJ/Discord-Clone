import axios from "axios";
import { getToken } from "../utils/cookies";
import { store } from '../redux'

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
})

AxiosInstance.interceptors.request.use(config => {
    let token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

AxiosInstance.interceptors.response.use((response) => {
    return response
}, error => {
    if (!error.response) {
        return Promise.reject(new Error('Failed to connect with server, please try again later'))
    }
    return Promise.reject(error)
})


export { AxiosInstance }

