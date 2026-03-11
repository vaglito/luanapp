"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Box, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Products } from "@/types/products.type";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SliderProductProps {
  products: Products[];
  Component: React.ElementType;
  exchange: number;
}

export const SliderProduct = ({
  products,
  Component,
  exchange,
}: SliderProductProps) => {
  return (
    <Box sx={{ position: "relative", marginTop: 2 }}>
      {/* Botón anterior */}
      <IconButton
        className="custom-prev"
        color="primary"
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: 0, sm: -20, md: -50 }, // Overlaps on mobile, pulls out on desktop
          transform: "translateY(-50%)",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          zIndex: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: { xs: 36, md: 40 },
          height: { xs: 36, md: 40 },
          border: "1px solid rgba(0,0,0,0.05)",
          "&:hover": { bgcolor: "white", transform: "translateY(-50%) scale(1.1)" },
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" sx={{ ml: 0.5 }} />
      </IconButton>

      {/* Botón siguiente */}
      <IconButton
        className="custom-next"
        color="primary"
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: 0, sm: -20, md: -50 }, // Overlaps on mobile, pulls out on desktop
          transform: "translateY(-50%)",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          zIndex: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: { xs: 36, md: 40 },
          height: { xs: 36, md: 40 },
          border: "1px solid rgba(0,0,0,0.05)",
          "&:hover": { bgcolor: "white", transform: "translateY(-50%) scale(1.1)" },
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
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Box sx={{ paddingY: 4, paddingX: { xs: 1, sm: 1, md: 2, lg: 2 } }}>
              <Component product={product} exchange={exchange} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

