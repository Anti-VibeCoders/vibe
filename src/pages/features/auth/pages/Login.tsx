import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/common/components/ui/form"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Input } from "@/common/components/ui/input"
import { Button } from "@/common/components/ui/button"
import { loginSchema } from "../data/login"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/useToast"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { showToastMessage } = useToast()
    const { login } = useAuth()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
        }
    })

    return (
        <>
            <div className="min-h-[100dvh] w-full">
                <div className="header flex px-8 h-15 items-center cursor-pointer max-sm:justify-center" onClick={() => {
                    navigate('/')
                }}>
                    <h1 className="text-3xl font-bold">Vibe</h1>
                </div>
                <div className="form-container w-full my-auto h-[90dvh] flex flex-col gap-4 justify-center items-center">
                    <h2 className="text-4xl font-bold text-center">Iniciar Sesión</h2>
                    <div className="des-login">
                        <p className="text-center text-neutral-400">Ingresa tus credenciales para continuar</p>
                    </div>
                    <div className="login-container w-full flex justify-center items-center mt-4">
                        <Form {...form}>
                            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={() => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="w-md h-12 dark:bg-neutral-500 max-sm:w-xs" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={() => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 dark:bg-neutral-500 max-sm:w-xs" />
                                            </FormControl>
                                            <FormDescription className="text-right text-blue-400">
                                                <Link to="/restore">¿Olvidaste tu contraseña?</Link>
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                                <Button className="w-md bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-500 active:bg-blue-600 h-10 max-sm:w-xs" onClick={() => login(email, password, navigate, showToastMessage)}>Iniciar Sesión</Button>
                                <p className="text-center">¿No tienes cuenta? <Link to="/register" className="text-blue-500"> Regístrate</Link></p>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login