import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const TvWebSeries = () => {
  const { data: movies = [], isLoading } = useQuery({
    queryKey: "tvwebseries",
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/tv/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      return data.results;
    },
    // refetchInterval: 600000 // 600000 milliseconds = 1 hour
  });


  console.log(movies)

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="my-12 px-6">
      <div className="flex justify-between items-center">
        <h2 className="section__title">TV & Web Series</h2>
        <p className="text-base text-white">See All</p>
      </div>

      {/* ================= Latest Movies Container ================== */}
      <div className="latest__movies-container mt-8">
        {movies.slice(0, 12).map((movie) => (
          <div key={movie.id} className="latest__movie relative shadow-lift">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvWebSeries;
