import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const SingleMovie = () => {
  const movie = useLoaderData();
  const movieId = movie.results[0].id;

  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: async () => {
        const url = `${import.meta.env.VITE_BASE_URL}/movie/${movieId}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=images,videos,credits`
      const { data } = await axios.get(url);
      return data;
    },
    enabled: !!movieId,
  });

  console.log(movies.images.backdrops);

  if (isLoading) return <div>Loading...</div>;

  return <div className="text-7xl text-white mt-20">
    <div>
        <div>
            <img src={`https://image.tmdb.org/t/p/original${movies.images.backdrops[10].file_path}`} alt="" />
        </div>
    </div>
  </div>;
};

export default SingleMovie;
