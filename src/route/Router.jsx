import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllMovie from "../pages/AllMovie";
import ALLWebSeries from "../pages/ALLWebSeries";

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
        path: "/genres/tv-web-series",
        element: <ALLWebSeries />
      },
      {
        path: "/upcoming",
        element: <AllMovie />
      },

    ],
  },
]);

export default router;
