import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/common/components/ui/button"
import { Checkbox } from "@/common/components/ui/checkbox"
import { userRegister } from "../data/register"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/useToast"

function Register() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [active, setActive] = useState(false)
    const { showToastMessage } = useToast()

    useEffect(() =>{
        password !== repeatedPassword && repeatedPassword !== ""? setActive(true) : setActive(false)
    })


    return (
        <>
            <div className="min-h-[100dvh] w-full overflow-auto">
                <div className="header hidden sm:flex px-8 h-15 items-center cursor-pointer " onClick={() => {
                    navigate('/login')
                }}>
                    <h1 className="text-3xl font-bold">Vibe</h1>
                </div>
                <div className="form-container w-full my-auto mt-20 sm:mt-0 h-[90dvh] flex flex-col gap-4 justify-center items-center">
                    <h2 className="text-4xl font-bold text-center">Crear cuenta</h2>
                    <div className="des-login">
                        <p className="text-center text-neutral-400">Ingresa tus datos para unirte a Vibe</p>
                    </div>
                    <div className="login-container w-6xl flex justify-center items-center mt-4">
                            <form className="flex flex-col gap-4 w-md items-center sm:items-start" onSubmit={(e) => e.preventDefault()}>
                                <div className="name-lastname-fields flex flex-col gap-4 sm:flex-row items-center justify-between w-full">
                                     <input
                                       name="firstName" 
                                       placeholder="Nombre"
                                       className="regiterInput w-full h-12 max-sm:w-xs"
                                       value={firstName}
                                       onChange={e => setFirstName(e.target.value)} />
                                     <input 
                                       name="lastName"
                                       placeholder="Apellido"
                                       className="regiterInput w-full h-12 max-sm:w-xs"
                                       value={lastName}
                                       onChange={e => setLastName(e.target.value)} />
                                </div>
                                <input
                                  name="username"
                                  placeholder="Nombre de usuario"
                                  className="regiterInput w-full h-12 max-sm:w-xs"
                                  value={username}
                                  onChange={e => setUsername(e.target.value)} />
                                <input
                                  name="email"
                                  placeholder="Correo electrónico"
                                  className="regiterInput w-full h-12 max-sm:w-xs"
                                  value={email}
                                  onChange={e => setEmail(e.target.value)} />
                                <input
                                  name="password"
                                  type="password"
                                  placeholder="Contraseña"
                                  className="regiterInput h-12 max-sm:w-xs w-full"
                                  value={password}
                                  onChange={e => setPassword(e.target.value)} />
                                <input
                                  name="repeat_password"
                                  type="password"
                                  placeholder="Confirmar Contraseña"
                                  className="regiterInput h-12 max-sm:w-xs w-full"
                                  value={repeatedPassword}
                                  onChange={e => setRepeatedPassword(e.target.value)} />
                                
                                {active && (
                                    <span className="text-red-600">La contraseña no es igual a la original</span>
                                )}
                                <div className="te flex gap-2 items-center ml-0.5 justify-start">
                                    <Checkbox id="terms" className="cursor-pointer"></Checkbox>
                                    <label htmlFor="terms">Acepto los <Link to="/terms" className="text-blue-400 hover:underline">términos y condiciones</Link></label>
                                </div>
                                <Button className="w-md bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-500 active:bg-blue-600 h-10 max-sm:w-xs" onClick={() => {
                                    if (password.length < 6) {
                                        showToastMessage("La contraseña debe tener mínimo 6 carácteres", "error")
                                        return
                                    }
                                    
                                    if (password !== repeatedPassword || (firstName.length === 0 && lastName.length === 0) || (firstName.length === 0 || lastName.length === 0)) {
                                        showToastMessage("Por favor, verifique los campos.", "error")
                                        return
                                    }
                                    userRegister(username, password, email, firstName, lastName, showToastMessage)
                                }}>Crear Cuenta</Button>
                                <p className="!text-center">¿Ya tienes cuenta? <Link to="/" className="text-blue-400 hover:underline">Inicia sesión</Link></p>
                            </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register