import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import UpComingMovies from "../components/Home/UpComingMovies";
import Genre from "../components/Home/Genre";
import MovieDetails from "../components/Single/MovieDetails";
import SimilarTitles from "../components/Single/SimilarTitles";

const SingleMovie = () => {
  const movies = useLoaderData();
  const movieId = movies.results[0].id;

  const { data: movie = [], isLoading } = useQuery({
    queryKey: ["movie or tv", movieId],
    queryFn: async () => {
      const firstResult = movies.results[0];

      let url = "";

      // ============= Checking if is it movie
      if (firstResult.media_type === "movie") {
        url = `${import.meta.env.VITE_BASE_URL}/movie/${movieId}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=images,videos,credits`;
      }

      // ============= Checking if is it tv web series
      if (firstResult.media_type === "tv") {
        url = `${import.meta.env.VITE_BASE_URL}/tv/${movieId}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=images,videos,credits`;
      }

      const { data } = await axios.get(url);
      return data;
    },
    enabled: !!movieId,
  });

  const mediaType = Object.prototype.hasOwnProperty.call(movie, "title")
    ? "movie"
    : "tv";

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="pt-16 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[75%]">
        <MovieDetails movie={movie} />
        <SimilarTitles movieId={movieId} mediaType={mediaType} />

        {/* ========== Other Details =================== */}
        <p className="text-white px-6 mt-10 truncate">
          Home &gt; Movie &gt; {movie.title || movie.name} (
          {movie.release_date
            ? movie.release_date.substring(0, 4)
            : movie.first_air_date?.substring(0, 4)}
          ) Dual Audio [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p |
          GDRive{" "}
        </p>
      </div>

      <div className="min-h-screen w-full lg:w-[25%] px-6">
        <UpComingMovies />
        <Genre />
      </div>
    </div>
  );
};

export default SingleMovie;
