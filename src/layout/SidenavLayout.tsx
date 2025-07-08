import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import Home from "@/pages/Home";
import { useLocation, Outlet } from "react-router-dom";

function SidenavLayout() {
  const location = useLocation();
  const home = location.pathname === "/home";
  const messages = location.pathname === "/home/messages";
  const configuration = location.pathname === '/home/configuration';

  return (
    <>
      <div className="flex flex-col h-[100dvh]">
        <Header />
        <div className="home_container">
          {!messages && !configuration && <SideNav />}

          {home ? <Home /> : <Outlet />}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SidenavLayout;