import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllMovie from "../pages/AllMovie";
import ALLWebSeries from "../pages/ALLWebSeries";
import Upcoming from "../pages/Upcoming";
import SearchMovie from "../pages/SearchMovie";
import CategoryPage from "../pages/CategoryPage";
import SingleMovie from "../pages/SingleMovie";

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
        element: <AllMovie />,
      },
      {
        path: "/genres/tv-web-series",
        element: <ALLWebSeries />,
      },
      {
        path: "/upcoming",
        element: <Upcoming />,
      },
      {
        path: "/search",
        element: <SearchMovie />,
      },
      {
        path: "/genre/:genre",
        element: <CategoryPage />,
      },
      {
        path: "/movie/:movieName",
        element: <SingleMovie />,
        loader: ({ params }) => {
          const movieNam = decodeURIComponent(params.movieName); // ✅ Encode for URL Safety
          const apiUrl = `${
              import.meta.env.VITE_BASE_URL
            }/search/multi?query=${movieNam}&api_key=${
              import.meta.env.VITE_API_KEY
            }`
          return fetch(apiUrl)
        },
      },
    ],
  },
]);

export default router;
