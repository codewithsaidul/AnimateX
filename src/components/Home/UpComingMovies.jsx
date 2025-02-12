import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FaStar } from "react-icons/fa";

const UpComingMovies = () => {
  const { data: upcomingMovies = [], isLoading } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: async () => {
      try {
        const today = new Date().toISOString().split("T")[0]; // বর্তমান তারিখ YYYY-MM-DD
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1); // ১ মাস পরের তারিখ
        const nextMonthFormatted = nextMonth.toISOString().split("T")[0];

        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/discover/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }&primary_release_date.gte=${today}&primary_release_date.lte=${nextMonthFormatted}`
        );

        return data.results; // ✅ Returns upcoming movies
      } catch (error) {
        console.error("Error fetching upcoming movies:", error.message);
        throw error;
      }
    },
  });

  if (isLoading) return <div>Loading....</div>;

  return (
    <div>
      <h3 className="mt-5 upcoming__heading">Upcoming Movies</h3>

      {/* ================ Upcoming Movies Container ================= */}
      <div className="upcoming__container">
        {upcomingMovies.slice(0, 7).map((movie, index) => (
          <div key={index} className="upcoming__movie">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="w-20 h-20"
            />
            <div>
              <h4 className="text-base text-white hidden lg:block">
                {movie.title.substring(0, 10)} (
                {movie.release_date.substring(0, 4)})...
              </h4>
              <h4 className="text-base text-white lg:hidden">
                {movie.title} ({movie.release_date.substring(0, 4)}) Dual Audio
                [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p | GDRive
              </h4>
              <p className="text-white text-sm">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
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
        ))}
      </div>
    </div>
  );
};

export default UpComingMovies;
