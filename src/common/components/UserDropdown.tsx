import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/common/components/ui/dropdown-menu";
import { userSignOut } from "../data/navigation";

function UserDropdown() {
    const navigate = useNavigate()

    return (
        <>
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
                    <Link to="profile/1"><DropdownMenuItem className="cursor-pointer">
                        Perfil
                    </DropdownMenuItem></Link>
                    <Link to="/"><DropdownMenuItem className="cursor-pointer">
                        Pagos
                    </DropdownMenuItem></Link>
                    <Link to="/"><DropdownMenuItem className="cursor-pointer">
                        Equipo
                    </DropdownMenuItem></Link>
                    <span onClick={() => userSignOut(navigate)}><DropdownMenuItem className="cursor-pointer">
                        Cerrar sesión
                    </DropdownMenuItem></span>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserDropdown