import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="sm:w-full px-6 md:max-w-4xl lg:w-7xl m-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
