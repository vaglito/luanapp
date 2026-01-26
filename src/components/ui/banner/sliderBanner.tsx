"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Banner } from "@/types/banner.type";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { BannerCard } from "./banner-card";

export const SliderBanner = ({ banners }: { banners: Banner[] }) => {
  return (
    <Swiper
      className="mySwiper"
      navigation={true} // Habilita las flechas de navegación.
      modules={[Navigation, Pagination, Autoplay]} // Activa los módulos de navegación, paginación y autoplay.
      autoplay={{
        delay: 3000, // Configura el autoplay para que pase cada 2.5 segundos.
        disableOnInteraction: false, // Permite seguir el autoplay incluso después de la interacción.
      }}
      pagination={{
        dynamicBullets: true, // Muestra paginación con bullets dinámicos.
      }}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <BannerCard banner={banner} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

