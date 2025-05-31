import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useNavigate, Link } from "react-router-dom"
import { Moon, Sun, Bell, MessageSquare, Search } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "./ui/dropdown-menu"
import { useState, useEffect } from "react"

function Header() {
    const [darkMode, setDarkMode] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const html = document.documentElement
        if (darkMode) {
            html.classList.add('dark')
        } else {
            html.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <>
            <header className="border-b dark:border-b-gray-700 flex h-15 w-full items-center justify-between px-8 transition-all duration-300">
                <div className="header-left flex gap-2 items-center cursor-pointer" onClick={() => {
                    navigate('/home')
                }}>
                    <Avatar>
                        <AvatarFallback className="bg-black font-semibold text-white text-xl">V</AvatarFallback>
                    </Avatar>
                    <h1 className="text-3xl font-bold">Vibe</h1>
                </div>
                <div className="header-center w-1/2 h-9 max-md:hidden">
                    <div className="search-input w-full h-full relative">
                        <Search className="absolute left-2 top-2 size-5 dark:stroke-gray-600 placeholder:dark:text-gray-600 placeholder:text-gray-800 bg-none"/>
                        <input type="text" id="search" name="search" className="border rounded-sm w-full h-full dark:border-gray-700 outline-0 px-4 pl-9 placeholder:text-gray-500 dark:placeholder:text-gray-600" placeholder="Buscar algo..." />
                    </div>
                </div>
                <div className="header-right flex gap-10 items-center max-lg:gap-6">
                    {darkMode ? (
                        <Sun className="cursor-pointer size-5" onClick={() => {
                            setDarkMode(!darkMode)
                        }}/>
                    ) : (
                        <Moon className="cursor-pointer size-5" onClick={() => {
                            setDarkMode(!darkMode)
                        }}/>
                    )}
                    <Link to="notifications"><Bell className="cursor-pointer size-5" /></Link>
                    <Link to="messages"><MessageSquare className="cursor-pointer size-5" /></Link>
                    <DropdownMenu >
                        <DropdownMenuTrigger>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="bg-blue-600 font-semibold text-black text-xl">A</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="dark:bg-neutral-950 dark:text-white mr-4 border dark:border-gray-600">
                            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link to="profile"><DropdownMenuItem className="cursor-pointer">Perfil</DropdownMenuItem></Link>
                            <Link to="/home"><DropdownMenuItem className="cursor-pointer">Pagos</DropdownMenuItem></Link>
                            <Link to="/home"><DropdownMenuItem className="cursor-pointer">Equipo</DropdownMenuItem></Link>
                            <Link to="/"><DropdownMenuItem className="cursor-pointer">Cerrar sesión</DropdownMenuItem></Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </>
    )
}

export default Header