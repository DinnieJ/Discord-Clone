import Cookie from 'js-cookie'

export const setToken = (token) => Cookie.set('_token', token)
export const getToken = () => Cookie.get('_token')
export const removeToken = () => Cookie.remove('_token') 