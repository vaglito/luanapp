"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Box, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Product } from "@/app/types/v2/products-type";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SliderProductProps {
  products: Product[];
  Component: React.ElementType;
}

export const SliderProduct = ({ products, Component }: SliderProductProps) => {
  return (
    <Box sx={{ position: "relative", marginTop: 2 }}>
      {/* Botón anterior */}
      <IconButton
        className="custom-prev"
        color="primary"
        sx={{
          position: "absolute",
          top: "50%",
          left: -50,
          zIndex: 10,
          boxShadow: 1,
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      {/* Botón siguiente */}
      <IconButton
        className="custom-next"
        color="primary"
        sx={{
          position: "absolute",
          top: "50%",
          right: -50,
          zIndex: 10,
          boxShadow: 1,
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.pk}>
            <Box sx={{ paddingY: 4, paddingX: { xs: 1, sm: 1, md: 2, lg: 2 } }}>
              <Component product={product} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
