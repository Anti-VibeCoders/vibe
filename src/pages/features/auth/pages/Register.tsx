import { Form, FormControl, FormField, FormItem, FormMessage } from "@/common/components/ui/form"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Input } from "@/common/components/ui/input"
import { Button } from "@/common/components/ui/button"
import { Checkbox } from "@/common/components/ui/checkbox"
import { signupSchema, userRegister } from "../data/register"
import { useState } from "react"
import { useToast } from "@/hooks/useToast"

function Register() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const { showToastMessage } = useToast()

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            repeat_password: ""
        }
    })

    return (
        <>
            <div className="min-h-[100dvh] w-full">
                <div className="header flex px-8 h-15 items-center cursor-pointer max-sm:justify-center" onClick={() => {
                    navigate('/login')
                }}>
                    <h1 className="text-3xl font-bold">Vibe</h1>
                </div>
                <div className="form-container w-full my-auto h-[90dvh] flex flex-col gap-4 justify-center items-center">
                    <h2 className="text-4xl font-bold text-center">Crear cuenta</h2>
                    <div className="des-login">
                        <p className="text-center text-neutral-400">Ingresa tus datos para unirte a Vibe</p>
                    </div>
                    <div className="login-container w-6xl flex justify-center items-center mt-4">
                        <Form {...form}>
                            <form className="flex flex-col gap-4 w-md" onSubmit={(e) => e.preventDefault()}>
                                <div className="name-lastname-fields flex items-center justify-between w-full">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Nombre" {...field} className="w-full h-12 max-sm:w-xs" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                    </FormField>
                                    <FormField
                                        control={form.control}
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Apellido" {...field} className="w-full h-12 max-sm:w-xs" value={lastName} onChange={e => setLastName(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                    </FormField>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Nombre de usuario" {...field} className="w-full h-12 max-sm:w-xs" value={username} onChange={e => setUsername(e.target.value)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                </FormField>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Correo electrónico" {...field} className="w-full h-12 max-sm:w-xs" value={email} onChange={e => setEmail(e.target.value)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                </FormField>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" {...field} className="h-12 max-sm:w-xs" value={password} onChange={e => setPassword(e.target.value)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} >
                                </FormField>
                                <FormField
                                    control={form.control}
                                    name="repeat_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Confirmar Contraseña" {...field} className="h-12 max-sm:w-xs" value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} >
                                </FormField>
                                <div className="te flex gap-2 items-center ml-0.5">
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
                                <p className="text-center">¿Ya tienes cuenta? <Link to="/" className="text-blue-400 hover:underline">Inicia sesión</Link></p>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register