import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import SideNav from "./SideNav";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  Bookmark,
  Users,
  User,
  Bolt,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function ResponsiveSideNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <div className="md:hidden p-2">
        <button
          onClick={toggleMenu}
          className="text-white hover:bg-neutral-800 p-2 rounded-md"
        >
          <Menu className="w-6 h-6 hover:cursor-pointer" />
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMenu}></div>
          <div className="relative w-64 bg-black h-full z-50 p-4 shadow-lg overflow-y-auto flex flex-col">
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleMenu}
                className="text-white p-1 hover:bg-neutral-800 rounded"
              >
                <X className="w-5 h-5 hover:cursor-pointer" />
              </button>
            </div>
            {/* Menu Movil */}
            <div className="flex flex-col gap-6 w-full text-white">
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-blue-600 font-semibold text-black text-xl">
                    V
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-lg font-bold">Usuario Vibe</span>
                  <span className="text-neutral-500 text-sm">@usuario</span>
                </div>
              </div>
              <ul className="flex flex-col gap-2">
                <Link to="/home" onClick={toggleMenu}>
                  <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
                    <Home size={18} /> Inicio
                  </li>
                </Link>
                <Link to="/home" onClick={toggleMenu}>
                  <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
                    <Compass size={18} />
                    Explorar
                  </li>
                </Link>
                <Link to="/home/notifications" onClick={toggleMenu}>
                  <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
                    <Bell size={18} />
                    Notificaciones
                  </li>
                </Link>
                <Link to="/home/messages/1" onClick={toggleMenu}>
                  <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
                    <MessageSquare size={18} />
                    Mensajes
                  </li>
                </Link>
                <Link to="/home" onClick={toggleMenu}>
                  <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
                    <Bookmark size={18} />
                    Listas
                  </li>
                </Link>
                <Link to="/home/friends" onClick={toggleMenu}>
                  <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
                    <Users size={18} />
                    Amigos
                  </li>
                </Link>
                <Link to="/home/profile" onClick={toggleMenu}>
                  <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
                    <User size={18} />
                    Perfil
                  </li>
                </Link>
                <Link to="/home" onClick={toggleMenu}>
                  <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
                    <Bolt size={18} />
                    Configuración
                  </li>
                </Link>
              </ul>
              <Button
                onClick={() => navigate("/home/newpost")}
                text="Crear Post"
                withClass="w-full -mt-4"
              />
            </div>
          </div>
        </div>
      )}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:p-4">
        <SideNav />
      </aside>
    </>
  );
}
