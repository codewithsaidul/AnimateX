import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";
import axios from "axios";
// import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        return data.results;
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        throw error;
      }
    },
  });
  

  if (isLoading) return <div>Loading....</div>;

  return (
    <div className="px-6 py-5">
      <Swiper
        spaceBetween={20}
        centeredSlides={false}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        modules={[Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className={`w-full h-96 rounded-xl shadow-lg transition-transform transform}`}
              />
            </div>
            <div className="absolute bottom-8 left-0 w-full h-16 px-4 py-2">
              <h2 className="hero__title">
                {movie.title} ({movie.release_date.substring(0, 4)}) Dual...
              </h2>
              <p className="text-base text-normalText mt-10">
                {movie.release_date.substring(0, 4)}
              </p>
            </div>

            <div className="hero__tag">
              <p className="hero__tag-title">Movie</p>
            </div>

            <div className="hero__overlay"></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {movies.slice(0, 3).map((_, index) => (
          <span
            key={index}
            className={`hero__custom-pagination-item ${
              index === activeIndex % 3 ? "bg-primary w-5" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
