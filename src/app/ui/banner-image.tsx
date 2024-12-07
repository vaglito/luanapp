"use client";
import Link from "next/link";
import Image from "next/image";
import { Banner } from "../utils/extras";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselIndexProps {
  data: Banner[];
}

export function CarouselIndex({ data }: CarouselIndexProps) {
  return (
      <Swiper
        className="mySwiper"
        navigation={true} // Habilita las flechas de navegación.
        modules={[Navigation, Pagination, Autoplay]} // Activa los módulos de navegación, paginación y autoplay.
        autoplay={{
          delay: 2500, // Configura el autoplay para que pase cada 2.5 segundos.
          disableOnInteraction: false, // Permite seguir el autoplay incluso después de la interacción.
        }}
        pagination={{
          dynamicBullets: true, // Muestra paginación con bullets dinámicos.
        }}
      >
        {data.map((banner) => (
          <SwiperSlide key={banner.id} className="rounded-[1rem]">
            {banner.url_banner ? (
              <Link href={banner.url_banner}>
                <Image
                  src={banner.img_banner}
                  width={2000}
                  height={576}
                  alt={`Banner ${banner.title_banner}`}
                  priority={true}
                  className="rounded-[1rem] h-48 md:h-auto"
                />
              </Link>
            ) : (
              <Image
                src={banner.img_banner}
                width={2000}
                height={576}
                alt={`Banner ${banner.title_banner}`}
                priority={true}
                className="rounded-[1rem] h-48 md:h-auto"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
  );
}
