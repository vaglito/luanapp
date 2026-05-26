"use client";
import "swiper/css";
import { Box, IconButton, alpha } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Products } from "@/types/products.type";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CardProduct } from "@/components/catalog/product/CardProduct/card-product";
import { ButtonSlider } from "../../../ui/Buttons/ButtonSlider";

interface PopularProductsCarouselProps {
  products: Products[];
  exchange: number;
  startRank: number;
}

export const PopularProductsCarousel = ({
  products,
  exchange,
  startRank,
}: PopularProductsCarouselProps) => {
  return (
    <Box
      sx={{ position: "relative", mx: { xs: 0, md: -2 }, px: { xs: 0, md: 2 } }}
    >
      {/* Navigation Buttons */}
      <ButtonSlider
        className="popular-prev"
        side="left"
        icon={<ArrowBackIosNewIcon />}
      />

      <ButtonSlider
        className="popular-next"
        side="right"
        icon={<ArrowForwardIosIcon />}
      />

      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: ".popular-prev",
          nextEl: ".popular-next",
        }}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          900: { slidesPerView: 3, spaceBetween: 24 },
          1200: { slidesPerView: 5, spaceBetween: 24 },
        }}
        style={{ padding: "20px 4px" }} // Padding for shadows and rank badges
      >
        {products.map((product, index) => {
          const rank = startRank + index;
          // Rank Colors
          const badgeColor =
            rank === 1 ? "#FFD700" : // Gold
            rank === 2 ? "#E0E0E0" : // Silver
            rank === 3 ? "#CD7F32" : // Bronze
            "#5914A3";               // Brand Purple
          const textColor = rank <= 3 ? "#111" : "white";

          return (
            <SwiperSlide key={product.id} style={{ height: "auto" }}>
              <Box sx={{ position: "relative", height: "100%", pt: 1 }}>
                {/* Rank Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -4,
                    left: 12,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    bgcolor: alpha(badgeColor, 0.7),
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: textColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    fontWeight: 800,
                    fontSize: "1rem",
                    border: `1px solid ${alpha("#fff", 0.5)}`,
                    boxShadow: `0 8px 16px ${alpha(badgeColor, 0.25)}`,
                  }}
                >
                  {rank}
                </Box>

                <CardProduct product={product} exchange={exchange} />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};
