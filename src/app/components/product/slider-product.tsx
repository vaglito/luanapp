"use client";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";
import { Product } from "@/app/types/v2/products-type";

interface SliderProductProps {
  products: Product[];
  Component: React.ElementType;
}

export const SliderProduct = ({ products, Component }: SliderProductProps) => {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={2}
      spaceBetween={10} // 👈 default para móviles
      pagination={{ clickable: true }}
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
          spaceBetween: 24, // puedes ajustarlo para pantallas grandes
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.pk}>
          <Component product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
