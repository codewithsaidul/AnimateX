import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["latestMovies"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&page=${currentPage}`
      );
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

  }, [currentPage, refetch])

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="my-12 px-6">
      <div>
        <h2 className="section__title">Movie</h2>
      </div>

      {/* ================= Latest Movies Container ================== */}
      <div className="latest__movies-container mt-8">
        {data?.movies.map((movie) => (
          <div key={movie.id} className="latest__movie relative shadow-lift">
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
          </div>
        ))}
      </div>

      {/* ========================= Pagination ============================ */}
      <Pagination
        totalPages={data?.total_pages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Movies;
