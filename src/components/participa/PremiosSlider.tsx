// src/components/participa/PremiosSlider.tsx
"use client";

import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const PREMIOS = [
  { id: 1, src: "/participa/CASE.png", alt: "Premio Case" },
  { id: 2, src: "/participa/TARJETA-DE-VIDEO.png", alt: "Premio Tarjeta de Video" },
  { id: 3, src: "/participa/IMPRESORA.png", alt: "Premio Impresora" },
  { id: 4, src: "/participa/LAPTOP.png", alt: "Premio Laptop" },
  { id: 5, src: "/participa/MONITOR.png", alt: "Premio Monitor" },
];

export function PremiosSlider() {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 4,
        aspectRatio: "9/16",
        bgcolor: "grey.100",
        maxWidth: { xs: "350px", md: "100%" },
        mx: "auto",
        "& .swiper-pagination-bullet-active": {
          bgcolor: "primary.main",
        },
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {PREMIOS.map((premio) => (
          <SwiperSlide key={premio.id}>
            <Box
              component="img"
              src={premio.src}
              alt={premio.alt}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}