"use client";
import { Box } from "@mui/material";
import { typeResponse, Computer } from "@/types/computer.type";
import { ComputerCard } from "./computer-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function ComputerContainer({
  computers,
  exchange
}: {
  computers: typeResponse<Computer>;
  exchange: number
}) {
  return (
    <Box
      sx={{
        pb: 5,
        "& .swiper-pagination-bullet": {
          backgroundColor: "#cbd5e1",
          width: "10px",
          height: "10px",
          opacity: 1,
          transition: "all 0.3s ease",
        },
        "& .swiper-pagination-bullet-active": {
          backgroundColor: "#A3147F",
          width: "30px",
          borderRadius: "5px",
        },
        "& .swiper-button-next, & .swiper-button-prev": {
          color: "#A3147F",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
          "&:after": {
            fontSize: "1.2rem",
            fontWeight: "bold",
          },
          "&:hover": {
            backgroundColor: "#A3147F",
            color: "white",
            transform: "scale(1.05)",
          },
        },
        "& .swiper-wrapper": {
          alignItems: "stretch",
          py: 2
        },
      }}
    >
      <Swiper
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        style={{ paddingLeft: "4px", paddingRight: "4px" }}
      >
        {computers.results.map((computer) => (
          <SwiperSlide key={computer.id} style={{ height: "auto" }}>
            <ComputerCard computer={computer} exchange={exchange} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
