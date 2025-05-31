import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

function Login() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
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
                    <h2 className="text-4xl font-bold text-center">Iniciar Sesión</h2>
                    <div className="des-login">
                        <p className="text-center text-neutral-400">Ingresa tus credenciales para continuar</p>
                    </div>
                    <div className="login-container w-full flex justify-center items-center mt-4">
                        <Form {...form}>
                            <form className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Correo electrónico" {...field} className="w-md h-12 dark:bg-neutral-500 max-sm:w-xs" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" {...field} className="h-12 dark:bg-neutral-500 max-sm:w-xs" />
                                            </FormControl>
                                            <FormDescription className="text-right text-blue-400">
                                                <Link to="/restore">¿Olvidaste tu contraseña?</Link>
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                >
                                </FormField>
                                <Button className="w-md bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-500 active:bg-blue-600 h-10 max-sm:w-xs" onClick={() => {
                                    navigate('/home')
                                }}>Iniciar Sesión</Button>
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