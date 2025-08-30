import { createContext, useContext, useState } from 'react'
import type { NavigateFunction } from 'react-router-dom'

export interface User {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    token: string,
}

export interface AuthContextType {
    user: User | null,
    error: string | null,
    token: string | null,
    login: (email: string, password: string, navigate: NavigateFunction, showToastMessage: any) => Promise<void>,
    logout: () => void,
    isAuthenticated: boolean,
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
    user: null,
    error: null,
    token: null,
    login: async () => {},
    logout: () => {},
    isAuthenticated: false
})

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const isAuthenticated = user !== null && token !== null

    const login = async (email: string, password: string, navigate: NavigateFunction, showToastMessage: any) => {
        setError(null)
        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            if (!response.ok) {
                const errorData = await response.text()
                console.error(errorData)
                setError(errorData)
                return
            }

            const data = await response.json()

            if (response.ok) {
                console.log(data)
                setUser(data.user)
                setToken(data.token)
                navigate('/home')
            } else {
                showToastMessage("Ha ocurrido un error", "error")
                console.log(data)
            }
        } catch (error) {
            setError(error as string)
            showToastMessage("Ha ocurrido un error", "error")
            console.error(error as Error)
        }
    }

    const logout = () => {
        setError(null)
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ user, error, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext)
}