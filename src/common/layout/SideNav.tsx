import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/ui/avatar";
import {
    Home,
    Compass,
    Bell,
    MessageSquare,
    Bookmark,
    User,
    Bolt,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sidenavLinks } from "../data/navigation";
import SideNavOption from "../components/SideNavOption";
import { useAuth } from "@/hooks/useAuth";

function SideNav() {
    const navigate = useNavigate()
    const { user } = useAuth()

    const iconsMap = {
        Home: <Home />,
        Compass: <Compass />,
        Bell: <Bell />,
        MessageSquare: <MessageSquare />,
        Bookmark: <Bookmark />,
        User: <User />,
        Bolt: <Bolt />
    }

    const sidenavLinks = [
    {
        link: '/home',
        icon: 'Home',
        text: 'Inicio'
    },
    {
        link: 'explore',
        icon: 'Compass',
        text: 'Explorar'
    },
    {
        link: 'notifications',
        icon: 'Bell',
        text: 'Notificaciones'
    },
    {
        link: 'messages/1',
        icon: 'MessageSquare',
        text: 'Mensajes'
    },
    {
        link: `profile/${user?.id}`,
        icon: 'User',
        text: 'Perfil'
    },
    {
        link: 'configuration',
        icon: 'Bolt',
        text: 'Configuración'
    },
]

    return (
        <>
            <div className="sideNav__container">
                <div className="side-nav-top">
                    <div className="side-nav-top-left">
                        <div className="user flex gap-2">
                            <Avatar className="size-12">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="bg-blue-600 font-semibold text-black text-xl">
                                    V
                                </AvatarFallback>
                            </Avatar>
                            <div className="user-info flex flex-col justify-between">
                                <span className="text-xl font-bold">{`${user?.first_name} ${user?.last_name}`}</span>
                                <span className="text-neutral-500">@{user?.username}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="side-nav-bottom">
                    <div className="side-nav-bottom-left-bottom">
                        <ul className="side-nav-bottom-left-bottom-list flex flex-col gap-2">
                            {sidenavLinks.map((link, i) => (
                                <SideNavOption key={i} link={link.link} icon={iconsMap[link.icon as keyof typeof iconsMap]} text={link.text} />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="create-post-btn">
                    <button className="btn bg-blue-500 font-semibold active:bg-blue-600 transition-all duration-200 cursor-pointer text-black w-full h-10 rounded-sm" onClick={() => navigate('new-post')}>
                        Crear post
                    </button>
                </div>
            </div>
        </>
    );
}

export default SideNav;
