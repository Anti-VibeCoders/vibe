import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate, Link } from "react-router-dom";
import { Moon, Sun, Bell, MessageSquare, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

import { useState, useEffect, useRef } from "react";
import Notifications from "@/pages/Notifications";
function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef<HTMLAnchorElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (!showNotif) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotif(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotif]);

  return (
    <>
      <header className="header__container">
        <div
          className="header__logo"
          onClick={() => {
            navigate("/home");

          }}
        >
          <Avatar>
            <AvatarFallback className="bg-black font-semibold text-white text-xl">
              V
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold">Vibe</h1>
        </div>

        <div className="header__search">

          <div className="search-input w-full h-full relative">
            <Search className="absolute left-2 top-2 size-5 dark:stroke-gray-600 placeholder:dark:text-gray-600 placeholder:text-gray-800 bg-none" />
            <input
              type="text"
              id="search"
              name="search"
              className="border rounded-sm w-full h-full dark:border-gray-700 outline-0 px-4 pl-9 placeholder:text-gray-500 dark:placeholder:text-gray-600"
              placeholder="Buscar algo..."
            />
          </div>
        </div>

        <div className="header__nav">

          {darkMode ? (
            <Sun
              className="cursor-pointer size-5"
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            />
          ) : (
            <Moon
              className="cursor-pointer size-5"
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            />
          )}

          <a
            ref={notifRef}
            onClick={() => setShowNotif(!showNotif)}
            className="relative"
          >
            <Bell className="cursor-pointer size-5" />
            {showNotif && (
              <div
                className="absolute w-72 m-auto top-10 -right-25 bg-black overflow-scroll z-50 h-[450px] sm:w-96 rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Notifications className="compact" />
              </div>
            )}
          </a>

          <Link to="messages"><MessageSquare className="cursor-pointer size-5" /></Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-blue-600 font-semibold text-black text-xl">
                  A
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-neutral-950 dark:text-white mr-4 border dark:border-gray-600">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="profile"><DropdownMenuItem className="cursor-pointer">
                Perfil
              </DropdownMenuItem></Link>
              <Link to="/"><DropdownMenuItem className="cursor-pointer">
                Pagos
              </DropdownMenuItem></Link>
              <Link to="/"><DropdownMenuItem className="cursor-pointer">
                Equipo
              </DropdownMenuItem></Link>
              <Link to="/"><DropdownMenuItem className="cursor-pointer">
                Cerrar sesión
              </DropdownMenuItem></Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}

export default Header;
