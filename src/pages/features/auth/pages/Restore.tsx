import { Form, FormControl, FormField, FormItem, FormMessage } from "@/common/components/ui/form"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Input } from "@/common/components/ui/input"
import { Button } from "@/common/components/ui/button"
import { restoreSchema } from "../data/restore"

function Restore() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof restoreSchema>>({
        resolver: zodResolver(restoreSchema),
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
                    <h2 className="text-4xl font-bold text-center">Recupera tu contraseña</h2>
                    <div className="des-login">
                        <p className="text-center text-neutral-400 max-w-[50ch]">Ingresa tu dirección de correo electrónico para enviarte un correo de recuperación</p>
                    </div>
                    <div className="login-container w-full flex justify-center items-center mt-4">
                        <Form {...form}>
                            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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
                                    )}>
                                </FormField>
                                <Button className="w-md bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-500 active:bg-blue-600 h-10 max-sm:w-xs" onClick={() => {
                                    navigate('/')
                                }}>Enviar Correo</Button>
                                <p className="text-center">¿No tienes cuenta? <Link to="/register" className="text-blue-500"> Regístrate</Link></p>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Restore