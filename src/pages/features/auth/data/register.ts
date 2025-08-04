import { z } from "zod"

export const signupSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    repeat_password: z.string()
})

export const userRegister = async (username: string, password: string, email: string, firstName: string, lastName:string) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                first_name: firstName,
                last_name: lastName
            })
        })
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            localStorage.setItem('token', JSON.stringify(data.token))
            alert("Se ha enviado un correo de verificación")
        } else {
            console.error("Error en el servidor: ", data)
            console.log(response.status)
        }
    } catch (error) {
        console.error(error)
    }
}