"use client"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";
import { Product } from "@/app/types/v2/products-type";
import { CardProduct } from "./card-product";

export const SliderProduct = ({ products }: { products: Product[] }) => {
    return (
        <Swiper
            modules={[Pagination]}
            slidesPerView={1}
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
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
        >
            {products.map((product) => (
                <SwiperSlide key={product.pk}>
                    <CardProduct product={product} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
};