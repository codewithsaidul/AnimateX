import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-deepBlack">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
