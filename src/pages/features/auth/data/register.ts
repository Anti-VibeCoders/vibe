
export const userRegister = async (username: string, password: string, email: string, firstName: string, lastName:string, showToastMessage: any) => {
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
            showToastMessage("Se ha enviado un correo de verificación", "success")
        } else {
            showToastMessage("Ha ocurrido un error iniciando sesión", "error")
            console.error("Error en el servidor: ", data)
            console.log(response.status)
        }
    } catch (error) {
        console.error(error)
    }
}