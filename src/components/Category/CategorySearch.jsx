import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import useLoading from "../hook/useLoading";

const CategorySearch = ({ genre, genres }) => {
  const { setLoading } = useLoading();
  const genreId = genres.find((cat) => cat.name === genre);

  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", genreId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&with_genres=${genreId?.id}`
      );
      setLoading(false)
      return data.results;
    },
  });

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="section__title">
          <span className="text-white">Category : </span>
          {genre}
        </h2>
      </div>

      {/* ================= Category Container ================== */}
      <div className="latest__movies-container mt-8">
        {movies.slice(0, 12).map((movie) => (
          <Link
            to={`/movie/${encodeURI(movie.title || movie.name)}`}
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
                {movie.title || movie.name} (
                {movie.release_date
                  ? movie.release_date.substring(0, 4)
                  : movie.first_air_date?.substring(0, 4)}
                ) Dual Audio [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p |
                GDRive
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

CategorySearch.propTypes = {
  genre: PropTypes.string,
  genres: PropTypes.object,
};

export default CategorySearch;
