import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="sm:w-full px-6 md:max-w-5xl lg:w-7xl m-auto">
        <Outlet />
      </div>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} gutter={1} />
    </div>
  );
}
