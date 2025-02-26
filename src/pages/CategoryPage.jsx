import { useParams } from "react-router-dom";
import UpComingMovies from "../components/Home/UpComingMovies";
import Genre from "../components/Home/Genre";
import CategorySearch from "../components/Category/CategorySearch";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useLoading from "../components/hook/useLoading";

const CategoryPage = () => {
  const { genre } = useParams();
  const { setLoading } = useLoading()

  const { data: genres = [], isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/genre/movie/list?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        return data.genres;
      } catch (error) {
        console.error("Error fetching animes:", error.message);
        throw error;
      }
    },
  });


    useEffect(() => {
      setLoading(isLoading)
    }, [isLoading, setLoading])

  return (
    <div className="pt-28 px-6 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[75%]">
        <CategorySearch genre={genre} genres={genres} />
      </div>

      <div className="min-h-screen w-full lg:w-[25%] px-6">
        <UpComingMovies />
        <Genre />
      </div>
    </div>
  );
};

export default CategoryPage;
