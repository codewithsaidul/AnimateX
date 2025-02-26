import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Pagination from "../Movie/Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLoading from "../hook/useLoading";

const AllUpcoming = () => {
  const { setLoading } = useLoading()
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["latestMovies"],
    queryFn: async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day
      const tomorrowFormatted = tomorrow.toISOString().split("T")[0];
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1); // ১ মাস পরের তারিখ
      const nextMonthFormatted = nextMonth.toISOString().split("T")[0];

      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&primary_release_date.gte=${tomorrowFormatted}&primary_release_date.lte=${nextMonthFormatted}&sort_by=primary_release_date.asc&page=${currentPage}`
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
        <h2 className="section__title">Upcoming Movies</h2>
      </div>

      {/* ================= Latest Movies Container ================== */}
      <div className="latest__movies-container mt-8">
        {data?.movies.map((movie) => (
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
                {movie.title || movie.name} (
                {movie.release_date
                  ? movie.release_date.substring(0, 4)
                  : movie.first_air_date?.substring(0, 4)}
                ) Dual Audio [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p |
                GDRive
              </h3>
              <p className="text-sm text-normalText">
                {new Date(movie.release_date|| movie.first_air_date).toLocaleDateString("en-US", {
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

      {/* ======================= Pagination ===================== */}
      <Pagination
        totalPages={data?.total_pages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllUpcoming;
