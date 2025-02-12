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

  const { data: animes, isLoading } = useQuery({
    queryKey: ["animes"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        return data.results;
      } catch (error) {
        console.error("Error fetching animes:", error.message);
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
        {animes.map((anime) => (
          <SwiperSlide key={anime.id}>
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/original${anime.backdrop_path}`}
                alt={anime.title}
                className="hero__img"
              />
            </div>
            <div className="hero__content">
              {/* <h1 className="hero__title"> {anime.title}</h1> */}
              <h2 className="hero__title">
                {anime.title} ({anime.release_date.substring(0, 4)}) Dual Audio
                [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p | GDRive
              </h2>
              <p className="hero__date">
                {anime.release_date.substring(0, 4)}
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
      <div className="hero__custom-pagination">
        {animes.slice(0, 3).map((_, index) => (
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
