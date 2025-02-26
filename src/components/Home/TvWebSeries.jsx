import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Pagination from "../Movie/Pagination";
import { useEffect, useState } from "react";
import useLoading from "../hook/useLoading";

const TvWebSeries = ({ cusClass, pagClass }) => {
  const { setLoading } = useLoading()
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tvwebseries"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/tv/top_rated?api_key=${
          import.meta.env.VITE_API_KEY
        }&page=${currentPage}`
      );
      setLoading(false);
      return {
        movies: data.results,
        total_pages: data.total_pages,
      };
    },
    keepPreviousData: true,
    // refetchInterval: 600000 // 600000 milliseconds = 1 hour
  });


  const handlePageChange = (page) => {
    if (page >= 1 && page <= data?.total_pages) {
      setCurrentPage(page); // Update current page on user click
      // refetch()
    }
  };

  useEffect(() => {
    let isMounted = true; // Keep track of whether the component is mounted

    if (isMounted && currentPage && refetch) {
      refetch(); // Trigger refetch if component is mounted
    }

    return () => {
      isMounted = false; // Cleanup when component unmounts
    };
  }, [currentPage, refetch]);

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  return (
    <div className="my-12 px-6">
      <div className="flex justify-between items-center">
        <h2 className="section__title">TV & Web Series</h2>
        <Link
          to="/genres/tv-web-series"
          className={`text-base text-white ${cusClass}`}
        >
          See All
        </Link>
      </div>

      {/* ================= Latest Movies Container ================== */}
      <div className="latest__movies-container mt-8">
        {data?.movies.map((movie) => (
          <Link to={`/movie/${encodeURIComponent(movie.title || movie.name)}`} key={movie.id} className="latest__movie relative shadow-lift">
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
                {movie.name} ({movie.first_air_date.substring(0, 4)}) Dual Audio
                [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p | GDRive
              </h3>
              <p className="text-sm text-normalText">
                {new Date(movie.first_air_date).toLocaleDateString("en-US", {
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

      {/* ================= Pagination ===================== */}
      <Pagination
        totalPages={data?.total_pages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pagiClass={pagClass}
      />
    </div>
  );
};

TvWebSeries.propTypes = {
  cusClass: PropTypes.string,
  pagClass: PropTypes.string,
};

export default TvWebSeries;
