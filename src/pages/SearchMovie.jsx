import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Search from "../components/Search/Search";
import Genre from "../components/Home/Genre";
import { useEffect } from "react";
import useLoading from "../components/hook/useLoading";

const SearchMovie = () => {
  const [searchParams] = useSearchParams();
  const { setLoading } = useLoading()
  const query = searchParams.get("query") || "";

  const { data: movies = [], isLoading, refetch } = useQuery({
    queryKey: ["query", query],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/search/multi?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${query}`
      );

      setLoading(false)
      return data.results;
    },
  });


  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    if (query) refetch(); // Query change hole refetch()
  }, [query, refetch]);



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
