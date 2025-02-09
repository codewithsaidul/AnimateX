import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Fetured = () => {
  const { data: movies = [], isLoading } = useQuery({
    queryKey: "movies",
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }&page=1`
      );
      return data.results;
    },
  });


  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="my-24 px-6">
      <h2 className="text-2xl font-bold mb-16">Fetured</h2>

      {/* ====================== fetred container ============================ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {
            movies.map((movie) => (
              <div key={movie.id} className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-primary to-secondary text-white font-bold text-center px-4 py-2">
                  {movie.title}
                </div>
              </div>
            ))

  
        }
      </div>
    </div>
  );
};

export default Fetured;
