import { AxiosInstance } from "./BaseRepository";

export const postLogin = ( payload ) => {
    return AxiosInstance.post('auth/login', payload )
}