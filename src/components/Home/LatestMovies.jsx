import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useLoading from "../hook/useLoading";

const LatestMovies = () => {

  const { setLoading } = useLoading()

  const { data, isLoading } = useQuery({
    queryKey: ["latestMovies"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setLoading(false)
      return data.results;
    },
  });

  const movies = data || [];

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <div className="my-12 px-6">
      <div className="flex justify-between items-center">
        <h2 className="section__title">Latest Movies</h2>
        <Link to="/movies" className="text-base text-white">
          See All
        </Link>
      </div>

      {/* ================= Latest Movies Container ================== */}
      <div className="latest__movies-container mt-8">
        {movies.slice(0, 12).map((movie) => (
          <Link
            to={`/movie/${encodeURIComponent(movie.title || movie.name)}`}
            key={movie.id}
            className="latest__movie relative shadow-lift"
          >
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                className="featured__img"
              />
            </div>
            <div className="latest__movie-content">
              <h3>
                {movie.title} ({movie.release_date.substring(0, 4)}) Dual Audio
                [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p | GDRive
              </h3>
              <p className="text-sm text-normalText">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="latest__rating">
              <p>
                <span className="text-yellow-300">
                  <FaStar size={16} />
                </span>
                {movie.vote_average.toFixed(1)}
              </p>
            </div>

            <div className="featured__overlay"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestMovies;
