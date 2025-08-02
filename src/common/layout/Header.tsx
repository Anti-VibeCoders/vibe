import { Avatar, AvatarFallback } from "@/common/components/ui/avatar";
import { Link } from "react-router-dom";
import { Moon, Sun, Bell, MessageSquare, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Notifications from "@/pages/features/social/components/notifications/Notifications";
import UserDropdown from "../components/UserDropdown";

function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef<HTMLAnchorElement>(null);

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
        <Link to="/home">
          <div className="header__logo">
            <Avatar>
              <AvatarFallback className="bg-black font-semibold text-white text-xl">
                V
              </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold">Vibe</h1>
          </div>
        </Link>
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
            className="relative">
            <Bell className="cursor-pointer size-5" />
            {showNotif && (
              <div
                className="notif-Compact__Container"
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className="text-xl font-semibold text-neutral-200">
                  Notificaciones
                </h1>
                <Notifications className="compact" />
              </div>
            )}
          </a>
          <Link to="messages"><MessageSquare className="cursor-pointer size-5" /></Link>
          <UserDropdown />
        </div>
      </header>
    </>
  );
}

export default Header;