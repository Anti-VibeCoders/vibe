import { Avatar, AvatarFallback } from "./ui/avatar"
import { useNavigate } from "react-router-dom"

function Footer() {
    const navigate = useNavigate()

    return (
        <>
        <footer className="flex justify-between px-8 border-t dark:border-t-gray-700 items-center h-15">
            <div className="footer-left flex gap-4 items-center">
                <div className="header-left flex gap-2 items-center cursor-pointer" onClick={() => {
                    navigate('/')
                }}>
                    <Avatar className="size-7">
                        <AvatarFallback className="bg-blue-600 font-semibold text-black text-xl">V</AvatarFallback>
                    </Avatar>
                    <h1 className="text-xl font-bold mr-2">Vibe</h1>
                </div>
                <a className="text-gray-500 font-semibold hover:underline" href="/">Acerca de</a>
                <a className="text-gray-500 font-semibold hover:underline" href="/">Privacidad</a>
                <a className="text-gray-500 font-semibold hover:underline" href="/">Términos</a>
                <a className="text-gray-500 font-semibold hover:underline" href="/">Ayuda</a>
            </div>
            <div className="footer-right text-gray-500">
                <span>&copy; 2025 Vibe. Todos los derechos reservados</span>
            </div>
        </footer>
        </>
    )
}

export default Footer