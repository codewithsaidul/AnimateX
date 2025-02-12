import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Fetured = () => {
  const { data: movies = [], isLoading } = useQuery({
    queryKey: "movies",
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/movie/top_rated?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      return data.results;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="my-10 px-6">
      <div className="flex justify-between items-center mb-8">
        {" "}
        <h2 className="section__title">Fetured</h2>
        <div className="featured__navigation">
          <div className="custom-prev">
            <IoIosArrowBack size={24} />
          </div>
          <div className="custom-next">
            <IoIosArrowForward size={24} />
          </div>
        </div>
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
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="featured__img"
              />
            </div>
            <div className="text-white px-4 py-2">
              <h3 className="featured__title">
                {movie.title} ({movie.release_date.substring(0, 4)}) Dual Audio
                [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p | GDRive
              </h3>
              <p className="text-sm text-normalText">
                {movie.release_date.substring(0, 4)}
              </p>
            </div>

            <div className="absolute top-0 right-0 bg-primary  px-4 py-1">
              <p className="text-xl font-bold text-white">Featured</p>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Fetured;
