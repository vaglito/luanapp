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
        padding: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // Subtle Glow
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  minHeight: "300px",
                }}
              >
                <Image
                  src={image.images || "/not-found.png"}
                  alt={product.relay.productName}
                  width={600}
                  height={500}
                  priority={index === 0}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "500px",
                    objectFit: "contain",
                    borderRadius: "0px",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Thumbs Slider */}
      {images.length > 1 && (
        <Box sx={{ height: "100px", mt: 2 }}>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            style={{ width: "100%", height: "100%" }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} style={{ opacity: 0.6, cursor: "pointer", borderRadius: "0px", overflow: "hidden" }}>
                <Box sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  border: "1px solid #e0e0e0",
                  borderRadius: "0px",
                  "&.swiper-slide-thumb-active": {
                    opacity: 1,
                    borderColor: "primary.main",
                    borderWidth: "2px"
                  }
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

