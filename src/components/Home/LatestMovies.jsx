import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const LatestMovies = () => {
  const { data: movies = [], isLoading } = useQuery({
    queryKey: "latestMovies",
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&&sort_by=release_date.desc&page=1`
      );
      return data.results;
    },
    // refetchInterval: 600000 // 600000 milliseconds = 1 hour
  });

  console.log();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="my-12 px-6">
      <div className="flex justify-between items-center">
        <h2 className="section__title">Latest Movies</h2>
        <p className="text-base text-white">
          See All
        </p>
      </div>

      {/* ================= Latest Movies Container ================== */}
      <div className="latest__movies-container mt-8">
        {movies.map((movie) => (
          <div key={movie.id} className="latest__movie relative shadow-lift">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="featured__img"
              />
            </div>
            <div className="text-white px-4 py-2">
              <h4 className="text-base text-white truncate max-w-full">
                {movie.title} ({movie.release_date.substring(0, 4)}) Dual Audio
                [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p | GDRive
              </h4>
              <p className="text-sm text-normalText">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="featured__rating bg-gradient-to-r from-primary to-secondary">
              <p className="text-white flex items-center gap-2">
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
    </div>
  );
};

export default LatestMovies;
