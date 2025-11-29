import { COOKIE_KEY } from "./consts";


export const getToken = () => {
    return localStorage.getItem(COOKIE_KEY)
}


export const setToken = (token: string) => {
    return localStorage.setItem(COOKIE_KEY, token)
}

export const removeToken = () => {
    return localStorage.removeItem(COOKIE_KEY)
}

export const checkIsLogin = () => {
    return !!getToken()
}