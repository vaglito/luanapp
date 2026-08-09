"use client";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { Box } from "@mui/material";
import Image from "next/image";
import { ProductDetail } from "@/types/products.type";

export default function ProductImageCarousel({ product }: { product: ProductDetail }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // Ensuring there are images to show
  const images = product.productsimages && product.productsimages.length > 0
    ? product.productsimages
    : [{ images: "/placeholder.png" }]; // Fallback if no images

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        borderRadius: "16px",
        p: { xs: 1.5, sm: 2, md: 3 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(98, 0, 234, 0.05)",
      }}
    >
      {/* Main Slider */}
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", mb: 2, overflow: "hidden" }}>
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs, Pagination]}
          className="mySwiper2"
          style={{ width: "100%", height: "100%" }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: { xs: "4/3", md: "1/1" },
                  minHeight: { xs: 280, md: 400 },
                  maxHeight: { xs: "60vh", md: 600 },
                  bgcolor: "grey.50",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={image.images || "/not-found.png"}
                  alt={product.relay.productName}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 600px"
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Thumbs Slider */}
      {images.length > 1 && (
        <Box sx={{ height: { xs: 64, sm: 80, md: 100 }, mt: 1 }}>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            style={{ width: "100%", height: "100%" }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} style={{ opacity: 0.6, cursor: "pointer", borderRadius: "8px", overflow: "hidden" }}>
                <Box sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  border: "1.5px solid #e0e0e0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "all 0.2s",
                  "&.swiper-slide-thumb-active": {
                    opacity: 1,
                    borderColor: "primary.main",
                    borderWidth: "2px",
                    boxShadow: "0 0 0 2px rgba(89,20,163,0.15)",
                  },
                }}>
                  <Image
                    src={image.images || "/not-found.png"}
                    alt={`Thumbnail ${index}`}
                    fill
                    sizes="150px"
                    style={{
                      objectFit: "contain",
                      padding: "4px"
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
}

