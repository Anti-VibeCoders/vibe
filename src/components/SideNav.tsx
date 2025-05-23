import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Compass, Bell, MessageSquare, Bookmark, Users, User, Bolt } from "lucide-react"
import { Link } from "react-router-dom"

function SideNav() {
    return (
        <>
        <div className="side-nav w-full h-full flex flex-col gap-4">
            <div className="side-nav-top">
                <div className="side-nav-top-left">
                    <div className="user flex gap-2">
                        <Avatar className="size-12">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback className="bg-blue-600 font-semibold text-black text-xl">V</AvatarFallback>
                        </Avatar>
                        <div className="user-info flex flex-col justify-between">
                            <span className="text-xl font-bold">Usuario Vibe</span>
                            <span className="text-neutral-500">@usuario</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="side-nav-bottom">
                    <div className="side-nav-bottom-left-bottom">
                        <ul className="side-nav-bottom-left-bottom-list flex flex-col gap-2">
                            <Link to="/">
                            <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center">
                                <Home/> Inicio
                            </li>
                            </Link>
                            <Link to="/">
                            <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center"><Compass />Explorar
                            </li>
                            </Link>
                            <Link to="/">
                            <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center"><Bell/> Notificaciones</li>
                            </Link>
                            <Link to="/">
                            <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center"><MessageSquare />Mensajes</li>
                            </Link>
                            <Link to="/">
                            <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center"><Bookmark/> Listas</li>
                            </Link>
                            <Link to="/">
                            <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center"><Users /> Amigos</li>
                            </Link>
                            <Link to="/">
                            <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center"><User /> Perfil</li>
                            </Link>
                            <Link to="/">
                            <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center"><Bolt /> Configuración</li>
                            </Link>
                        </ul>
                    </div>
            </div>
            <div className="create-post-btn">
                <button className="btn bg-blue-500 font-semibold active:bg-blue-600 transition-all duration-200 cursor-pointer text-black w-full h-10 rounded-sm">Crear post</button>
            </div>
        </div>
        </>
    )
}

export default SideNav