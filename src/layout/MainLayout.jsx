import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import useLoading from "../components/hook/useLoading";
import LoadingSpinner from "../components/Loading/LoadingSpinner";


const MainLayout = () => {
  const { loading } = useLoading();



  if (loading) {
   return  <LoadingSpinner />
  }
  return (
    <div className="bg-deepBlack">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
