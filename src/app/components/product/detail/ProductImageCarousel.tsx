"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"; // Modulos adicionales que puedes usar
import { Box } from "@mui/material";
import Image from "next/image";
import { Detail } from "@/app/types/detail";

export default function ProductImageCarousel({ product }: { product: Detail }) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        padding: 3,
        height: "100%",
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {product.productimage_set.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "12px",
              }}
            >
              <Image
                src={image.images}
                alt={`Imagen de ${product.sopprod.nom_prod}`}
                width={600}
                height={500}
                style={{
                  borderRadius: "12px",
                  transition: "transform 0.3s ease-in-out",
                  objectFit: "cover",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)";
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
