"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Box, IconButton } from "@mui/material";
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
    <Box sx={{ position: "relative", width: "100%" }}>
      <IconButton
        className="category-prev"
        color="primary"
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: -10, sm: -20, md: -30, lg: -40, xl: -50 },
          transform: "translateY(-50%)",
          backgroundColor: "white",
          boxShadow: 1,
          zIndex: 10,
          "&:hover": { backgroundColor: "white" },
          width: { xs: 30, sm: 36, md: 40 },
          height: { xs: 30, sm: 36, md: 40 },
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
      </IconButton>

      <IconButton
        className="category-next"
        color="primary"
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: -10, sm: -20, md: -30, lg: -40, xl: -50 },
          transform: "translateY(-50%)",
          backgroundColor: "white",
          boxShadow: 1,
          zIndex: 10,
          "&:hover": { backgroundColor: "white" },
          width: { xs: 30, sm: 36, md: 40 },
          height: { xs: 30, sm: 36, md: 40 },
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
      </IconButton>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={2}
        spaceBetween={20}
        navigation={{
          prevEl: ".category-prev",
          nextEl: ".category-next",
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
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
          <SwiperSlide key={category.id}>
            <CardCategory category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

