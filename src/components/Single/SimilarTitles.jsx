import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect } from "react";
import useLoading from "../hook/useLoading";

const SimilarTitles = ({ movieId, mediaType }) => {

  const { setLoading }  = useLoading()

  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["similarMovies", movieId],
    queryFn: async () => {
      let url = "";

      //   =============== checking media type is movie
      if (mediaType === "movie") {
        url = `${
          import.meta.env.VITE_BASE_URL
        }/movie/${movieId}/similar?api_key=${import.meta.env.VITE_API_KEY}`;
      }

      //   =============== checking media type is tv
      if (mediaType === "tv") {
        url = `${import.meta.env.VITE_BASE_URL}/tv/${movieId}/similar?api_key=${
          import.meta.env.VITE_API_KEY
        }`;
      }

      const { data } = await axios.get(url);

      const results = data.results;

      // ✅ Filter movies released after 2000
      const filteredMovies = results.filter(
        (movie) =>
          movie.release_date ||
          (movie.first_air_date &&
            parseInt(
              movie.release_date
                ? movie.release_date.substring(0, 4)
                : movie.first_air_date?.substring(0, 4)
            ) >= 2010)
      );

      setLoading(false);
      return filteredMovies;
    },
  });

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  return (
    <div className="my-10 px-6">
      <div className="flex justify-between items-center mb-8">
        {" "}
        <h2 className="section__title">Similar Title</h2>
      </div>

      {/* ====================== fetred container ============================ */}
      <Swiper
        spaceBetween={20}
        centeredSlides={false}
        loop={true}
        // loopAdditionalSlides= {1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
            // slidesPerGroup: 3,
          },
          768: {
            slidesPerView: 3,
            // slidesPerGroup: 4,
          },
          1024: {
            slidesPerView: 4,
            // slidesPerGroup: 6,
          },
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        // pagination={true}
        modules={[Autoplay, Navigation]}
        // onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative shadow-lift">
            <Link to={`/movie/${encodeURIComponent(movie.title || movie.name)}`}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                  className="featured__img"
                />
              </div>
              <div className="text-white px-4 py-2">
                <h3 className="featured__title">
                  {movie.title || movie.name} (
                  {movie.release_date
                    ? movie.release_date.substring(0, 4)
                    : movie.first_air_date?.substring(0, 4)}
                  ) Dual
                  Audio [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p |
                  GDRive
                </h3>
                <p className="text-sm text-normalText">
                  {movie.release_date
                    ? movie.release_date.substring(0, 4)
                    : movie.first_air_date?.substring(0, 4)}
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
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

SimilarTitles.propTypes = {
  movieId: PropTypes.number,
  mediaType: PropTypes.string,
};

export default SimilarTitles;
