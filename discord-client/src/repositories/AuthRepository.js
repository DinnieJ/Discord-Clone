import { AxiosInstance } from "./BaseRepository";

export const postLogin = ( payload ) => {
    return AxiosInstance.post('auth/login', payload )
}

export const postLogout = () => {
    return AxiosInstance.post('auth/logout')
}

export const fetchUserByToken = () => {
    return AxiosInstance.get('auth/user')
}