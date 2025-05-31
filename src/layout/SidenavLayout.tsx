import Footer from "@/components/Footer"
import Header from "@/components/Header"
import SideNav from "@/components/SideNav"
import Home from "@/pages/Home"
import { useLocation, Outlet } from "react-router-dom"

function SidenavLayout() {
    const location = useLocation()
    const home = location.pathname === '/home'
    const messages = location.pathname === '/home/messages'

    return (
        <>
            <div className="flex flex-col h-[100dvh]">
                <Header />
                <div className="flex flex-1 min-h-0">
                    {!messages && (
                        <div className="sidenav h-full flex flex-col items-center justify-center flex-shrink-0">
                            <SideNav />
                        </div>
                    )}
                    <div className="flex-1 h-full overflow-y-auto">
                        {home ? (
                            <Home />
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default SidenavLayout