import type { NavigateFunction } from "react-router-dom"

export const userSignOut = (navigate: NavigateFunction) => {
    navigate('/')
    localStorage.removeItem('token')
}