import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay} from "swiper/modules";
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
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`);
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
        // pagination={true}
        modules={[Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
      >
        {animes.map((anime) => (
          <SwiperSlide
            key={anime.id}
          >
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/original${anime.poster_path}`}
                alt={anime.title}
                className={`w-full h-70 object-cover rounded-xl shadow-lg transition-transform transform}`}
              />
            </div> 
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {animes.slice(0, 3).map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${
              index === activeIndex % 3 ? "bg-primary w-5" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
