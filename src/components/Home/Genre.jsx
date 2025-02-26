import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useLoading from "../hook/useLoading";

const Genre = () => {
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
        setLoading(false)
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
    <div className="mt-12">
      <h3 className="category__heading">Categories</h3>
      <ul className="category__list">
        {genres.map((genre) => (
          <Link
            to={`/genre/${genre.name}`}
            key={genre.id}
            className="category__item"
          >
            <li value={genre.id}>{genre.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Genre;
