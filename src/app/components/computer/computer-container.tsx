"use client";
import { Box, Typography } from "@mui/material";
import { typeResponse, Computer } from "@/app/types/computer.type";
import { ComputerCard } from "./computer-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export function ComputerContainer({
  computers,
  exchange
}: {
  computers: typeResponse<Computer>;
  exchange: number
}) {
  return (
    <Box>
      <Swiper
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {computers.results.map((computer) => (
          <SwiperSlide key={computer.id}>
            <ComputerCard computer={computer} exchange={exchange}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}