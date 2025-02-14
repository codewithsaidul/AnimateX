import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllMovie from "../pages/AllMovie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <AllMovie />
      },
      {
        path: "/genres",
        element: <AllMovie />
      },
      {
        path: "/upcoming",
        element: <AllMovie />
      },

    ],
  },
]);

export default router;
