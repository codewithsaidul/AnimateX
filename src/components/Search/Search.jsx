import PropTypes from "prop-types";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import NoMovie from "../Shared/NoMovie";

const Search = ({ movies, searchName }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlQuery = searchParams.get("query");
  const [query, setQuery] = useState(urlQuery || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="mt-10 px-6">
      <form onSubmit={handleSearch} className="mb-12">
        <h2 className="text-2xl font-bold text-white">
          Result Found {searchName}
        </h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="py-1 px-6 border-2 border-primary text-white mt-5 rounded-lg text-xl"
        />
      </form>

      {/* ================ Upcoming Movies Container ================= */}
      <div className="search__container ">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className="search__movie">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                className="w-full h-60 sm:w-[10%] sm:h-32"
              />
              <div>
                <Link
                  to={`/movie/${encodeURIComponent(movie.title || movie.name)}`}
                  className="text-base text-white"
                >
                  {movie.title || movie.name} (
                  {movie.release_date
                    ? movie.release_date.substring(0, 4)
                    : movie.first_air_date?.substring(0, 4)}
                  ) Dual Audio [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p
                  | GDRive
                </Link>
                <p className="text-normalText">
                  {movie.overview.substring(0, 150)}
                </p>
                <p className="text-white text-sm">
                  {new Date(movie.release_date || movie.first_air_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-white text-xs flex items-center gap-1">
                  <FaStar size={14} />
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <NoMovie title={urlQuery} />
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  movies: PropTypes.object,
  searchName: PropTypes.string,
};

export default Search;
