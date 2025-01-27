import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
// import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";


const Hero = () => {
  const { data: animes = [], isLoading } = useQuery({
    queryKey: ["animes"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/popular`, {
          params: { api_key: import.meta.env.VITE_API_KEY },
        });
        return data.results;
      } catch (error) {
        console.error("Error fetching animes:", error.message);
        throw error;
      }
    },
  });

  if (isLoading) return <div>Loading....</div>;

  return (
    <div>
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {animes.map((anime) => (
          <SwiperSlide
            key={anime.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${anime.poster_path}`}
              alt={anime.title}
              className="w-full h-[calc(100vh-80px)] bg-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
