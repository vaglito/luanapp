"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"; // Modulos adicionales que puedes usar
import { Box } from "@mui/material";
import Image from "next/image";
import { Detail } from "@/app/types/detail";

export function ProductImageCarousel({ product }: { product: Detail }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        margin: "20px auto",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: 4,
        padding: 3,
        position: "relative",
        overflow: "hidden",
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
        style={{ width: "100%", height: "auto" }}
      >
        {product.productimage_set.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 500, // Se asegura que el contenedor tenga el tamaño de la imagen
                borderRadius: 3,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={image.images}
                alt={`Imagen de ${product.sopprod.nom_prod}`}
                width={500}
                height={500}
                style={{
                  borderRadius: "12px",
                  transition: "transform 0.3s ease-in-out",
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
