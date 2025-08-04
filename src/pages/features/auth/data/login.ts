import type { NavigateFunction } from "react-router-dom"
import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const userLogIn = async (email: string, password: string, navigate: NavigateFunction) => {
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
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            localStorage.setItem('token', data.token)
            navigate('/home')
        } else {
            console.error("Error en el servidor: ", data)
            console.log(response.status)
        }
    } catch (error) {
        console.error(error)
    }
}