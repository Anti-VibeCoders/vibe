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

function SideNav() {
  const navigate = useNavigate();

  return (
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
        <Link to="/home">
          <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
            <Home size={18} /> Inicio
          </li>
        </Link>
        <Link to="/home">
          <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
            <Compass size={18} />
            Explorar
          </li>
        </Link>

        <Link to="/home/notifications">
          <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
            <Bell size={18} />
            Notificaciones
          </li>
        </Link>

        <Link to="/home/messages/1"> 
        {/* Aca se deberia poner un enlace con el
        id de la ultima conversacion del usuario, de momento 1*/}
          <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
            <MessageSquare size={18} />
            Mensajes
          </li>
        </Link>

        <Link to="/home">
          <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
            <Bookmark size={18} />
            Listas
          </li>
        </Link>

        <Link to="/home/friends">
          <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
            <Users size={18} />
            Amigos
          </li>
        </Link>

        <Link to="/home/profile">
          <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer">
            <User size={18} />
            Perfil
          </li>
        </Link>

        <Link to="/home">
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
  );
}
export default SideNav;
