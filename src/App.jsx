import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AuthContext } from "./AuthContext";
import Loading from "./Loading";


function App() {

  const location = useLocation();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setShowSpinner(true);
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer position="bottom-right" autoClose={1000} />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="sticky top-0 z-50 bg-base-100">
        <Navbar />
      </div>
      <div className="flex-1">
        {showSpinner ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
