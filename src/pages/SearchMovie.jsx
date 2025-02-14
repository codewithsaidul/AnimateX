import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Search from "../components/Search/Search";
import Genre from "../components/Home/Genre";

const SearchMovie = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["query"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${query}`
      );
      return data.results;
    },
  });


  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="pt-16 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[75%]">
        <Search movies={movies} searchName={query} />
      </div>

      <div className="min-h-screen w-full lg:w-[25%] px-6">
        <Genre />
      </div>
    </div>
  );
};

export default SearchMovie;
