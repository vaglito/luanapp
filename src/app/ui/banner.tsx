"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Interfaz que define la estructura del objeto `Banner`.
 * @interface Banner
 * @property {number} id - Identificador único del banner.
 * @property {boolean} is_active - Indica si el banner está activo.
 * @property {number} position_banner - Posición del banner en el orden de visualización.
 * @property {string} title_banner - Título del banner.
 * @property {string} img_banner - URL de la imagen del banner.
 * @property {string} [url_banner] - (Opcional) URL hacia la que redirige el banner si se hace clic en él.
 */
export interface Banner {
  id: number;
  is_active: boolean;
  position_banner: number;
  title_banner: string;
  img_banner: string;
  url_banner?: string;
}

/**
 * Componente funcional `BannerMain` que se encarga de mostrar un slider con banners.
 * Los banners se obtienen desde un endpoint de una API y se muestran utilizando el componente Swiper.
 *
 * @returns {JSX.Element} Retorna un contenedor con un slider que contiene banners.
 */
export function BannerMain(): JSX.Element {
  // Estado que almacena un array de banners. Inicialmente vacío.
  const [data, setData] = useState<Banner[]>([]);

  /**
   * Hook de efecto que realiza una solicitud fetch para obtener los datos de los banners al cargar el componente.
   * Actualiza el estado `data` con los banners obtenidos.
   */
  useEffect(() => {
    async function fetchBanner() {
      try {
        // Realiza la solicitud GET al endpoint de banners.
        const response = await fetch("https://luanatech.pe/api/config/banner/");

        // Convierte la respuesta en un array de objetos tipo `Banner`.
        const result: Banner[] = await response.json();

        // Actualiza el estado con los banners obtenidos.
        setData(result);
      } catch (error) {
        console.log(error); // Muestra el error en caso de fallar la solicitud.
      }
    }

    // Llama a la función que obtiene los banners.
    fetchBanner();
  }, []); // Solo se ejecuta al montar el componente.

  /**
   * Renderiza el componente Swiper para mostrar un carrusel de banners.
   */
  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ marginY: 2 }}>
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
                    className="rounded-[1rem]"
                  />
                </Link>
              ) : (
                <Image
                  src={banner.img_banner}
                  width={2000}
                  height={576}
                  alt={`Banner ${banner.title_banner}`}
                  priority={true}
                  className="rounded-[1rem]"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
}
