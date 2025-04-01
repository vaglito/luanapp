"use client";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper/modules";
import { Categorys } from "@/app/types/v2/categorys-type";
import { CardCategory } from "./card-category";
import { Box, Grid2 } from "@mui/material";

interface SliderCategoryProps {
  categories: Categorys[];
}

export const SliderCategory = ({ categories }: SliderCategoryProps) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={1}
      navigation={true}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      }}
      modules={[Navigation]}
      className="mySwiper"
    >
      {categories.map((category) => (
        <SwiperSlide key={category.pk}>
          <CardCategory category={category} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
