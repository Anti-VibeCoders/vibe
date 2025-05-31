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
import { useState, useEffect } from "react";

function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <header className="header_container">
        <div
          className="header-left flex gap-2 items-center cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <Avatar>
            <AvatarFallback className="bg-black font-semibold text-white text-xl">
              V
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold">Vibe</h1>
        </div>

        <div className="input_search-container">
          <div className="search-input w-full h-full relative">
            <Search className="absolute left-2 top-2 size-5 dark:stroke-gray-600 placeholder:dark:text-gray-600 placeholder:text-gray-800 bg-none" />
            <input
              type="text"
              id="search"
              name="search"
              className="input_search"
              placeholder="Buscar algo..."
            />
          </div>
        </div>
        <div className="header_icons">
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
          <Bell className="cursor-pointer size-5" />
          <Link to="/messages"><MessageSquare className="cursor-pointer size-5" /></Link>
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
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/">Pagos</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/">Equipo</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/login">Cerrar sesión</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}

export default Header;
