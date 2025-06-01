import { Outlet, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const home = location.pathname === "/";

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        {home ? (
          <div className="homepage_container">
            <Home />
          </div>
        ) : (
          <div className="outlet-container w-full flex-1 flex justify-center items-center">
            <Outlet />
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
