import { Bell, Bolt, Bookmark, Compass, Home, MessageSquare, User, Users, LogOut, Lock, Eye, Shield } from "lucide-react"
import { Link } from "react-router-dom"

function Config() {
    return (
        <>
            <section className="config w-full h-full flex">
                <div className="config-sidenav">
                    <div className="sidenav w-2xs h-full border-r dark:border-r-neutral-800 py-6 flex flex-col justify-between">
                        <ul className="side-nav-bottom-left-bottom-list flex flex-col gap-2 w-full mx-auto h-full px-4">
                            <Link to="">

                                <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center">
                                    <User /> Preferencias de la cuenta
                                </li>
                            </Link>

                            <Link to="">

                                <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center">
                                    <Lock />
                                    Inicio de sesión y seguridad
                                </li>
                            </Link>

                            <Link to="">
                                <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center">
                                    <Eye />
                                    Visibilidad
                                </li>
                            </Link>
                            <Link to="">

                                <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center">
                                    <Shield />
                                    Privacidad de datos
                                </li>
                            </Link>

                            <Link to="">

                                <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center">
                                    <Bookmark /> Datos de publicidad
                                </li>
                            </Link>
                        </ul>
                        <div className="sign-out w-max mx-auto">
                            <Link to="/">
                                <span className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center">
                                    <LogOut /> Cerrar sesión
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="config-content-container w-full">

                </div>
            </section>
        </>
    )
}

export default Config