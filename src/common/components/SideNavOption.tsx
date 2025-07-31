import type { ReactNode } from "react"
import { Link } from "react-router-dom"

function SideNavOption({ link, icon, text } : { link: string, icon: ReactNode, text: string }) {
    return (
        <>
            <Link to={link}>
                <li className="side-nav-bottom-left-bottom-list-item flex gap-2 hover:dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:text-white hover:text-black transition-all duration-200 h-10 px-2 rounded-sm cursor-pointer items-center">
                    {icon} {text}
                </li>
            </Link>
        </>
    )
}

export default SideNavOption