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
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: "50%",
          left: { xs: 0, sm: -10, md: -20 },
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          zIndex: 10,
          width: { md: 48 },
          height: { md: 48 },
          color: "primary.main",
          border: "1px solid rgba(255,255,255,0.8)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#5914A3",
            transform: "translateY(-50%) scale(1.1)",
            boxShadow: "0 8px 25px rgba(89, 20, 163, 0.25)",
          },
          "&.swiper-button-disabled": {
            opacity: 0,
            cursor: "default",
          }
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 24 }} />
      </IconButton>

      <IconButton
        className="category-next"
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: "50%",
          right: { xs: 0, sm: -10, md: -20 },
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          zIndex: 10,
          width: { md: 48 },
          height: { md: 48 },
          color: "primary.main",
          border: "1px solid rgba(255,255,255,0.8)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#5914A3",
            transform: "translateY(-50%) scale(1.1)",
            boxShadow: "0 8px 25px rgba(89, 20, 163, 0.25)",
          },
          "&.swiper-button-disabled": {
            opacity: 0,
            cursor: "default",
          }
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
      </IconButton>

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
          <SwiperSlide key={category.id} style={{ display: 'flex', justifyContent: 'center' }}>
            <CardCategory category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

