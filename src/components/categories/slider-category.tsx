"use client";

import "swiper/css";
import { Box } from "@mui/material";
import { ButtonSlider } from "../ui/Buttons/ButtonSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Navigation } from "swiper/modules";
import { CardCategory } from "./card-category";
import { Categories } from "@/types/categories.type";

interface SliderCategoryProps {
  categories: Categories[];
}

export const SliderCategory = ({ categories }: SliderCategoryProps) => {
  return (
    <Box sx={{ 
      position: "relative", 
      width: "100%",
      px: { xs: 2, sm: 3, md: 6 }, 
      overflow: "visible" 
    }}>
      <ButtonSlider
        className="category-prev"
        side="left"
        icon={<ArrowBackIosNewIcon />}
      />

      <ButtonSlider
        className="category-next"
        side="right"
        icon={<ArrowForwardIosIcon />}
      />

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={2}
        spaceBetween={15}
        navigation={{
          prevEl: ".category-prev",
          nextEl: ".category-next",
        }}
        style={{
          paddingTop: "30px",
          paddingBottom: "60px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide
            key={category.id}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <CardCategory category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
