import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideNav from "@/common/shared/SideNav";
import Home from "@/pages/features/social/pages/Home";
import { Toaster } from "sonner";
import { useLocation, Outlet } from "react-router-dom";
import Chatbot from "@/common/components/Chatbot";

function SidenavLayout() {
  const location = useLocation();
  const home = location.pathname === "/home";
  const messages = location.pathname === "/home/messages";
  const configuration = location.pathname === '/home/configuration';

  return (
    <>
      <Toaster theme="dark" />
      <div className="flex flex-col h-[100dvh]">
        <Header />
        <div className="home_container">
          {!messages && !configuration && <SideNav />}

          {home ? <Home /> : <Outlet />}
        </div>
        <Footer />
      </div>
      <div className="!absolute !bottom-20">
        <Chatbot />
      </div>
    </>
  );
}

export default SidenavLayout;
