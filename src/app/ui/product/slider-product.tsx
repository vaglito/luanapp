"use client";
import Link from "next/link";
import Image from "next/image";
import { Product, Result } from "@/app/types/products";
import { Typography, Box } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export function SliderProductResult({ products }: { products: Result[] }) {
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
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
        modules={[Pagination]}
        className="mySwiper"
      >
        {products.map((product) => {
          const precioOriginal =
            product.sopprod.cod_prod_relation_precios[0].precio_decimal;
          const precioOferta =
            product.sopprod.cod_prod_relation_precios[0].precio_oferta_d;
          const porcentajeDescuento =
            precioOferta > 0
              ? ((precioOriginal - precioOferta) / precioOriginal) * 100
              : 0;
          return (
            <SwiperSlide key={product.pk}>
              <Link href={`/producto/detalle/${product.slug}`}>
                <Box>
                  <Image
                    src={product.productimage_set[0].images}
                    alt={`Foto del producto ${product.sopprod.nom_prod}`}
                    width={500}
                    height={500}
                    className="rounded-xl"
                  />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{
                        lineHeight: 1,
                        fontWeight: 500,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 3, // 3 lines on small screens, full text on md+
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.sopprod.nom_prod}
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    {precioOferta > 0 ? (
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              textDecoration: "line-through",
                              color: "GrayText",
                              fontSize: "17px",
                              fontWeight: 600,
                            }}
                          >
                            ${precioOriginal} (S/
                            {
                              product.sopprod.cod_prod_relation_precios[0]
                                .precio_local
                            }
                            )
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "green", fontWeight: "bold" }}
                          >
                            {porcentajeDescuento.toFixed(2)}% te ahorras
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "primary.main",
                              fontSize: "20px",
                            }}
                          >
                            ${precioOferta}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "primary.main",
                              fontSize: "20px",
                            }}
                          >
                            (S/
                            {
                              product.sopprod.cod_prod_relation_precios[0]
                                .precio_oferta
                            }
                            )
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            fontSize: "20px",
                          }}
                        >
                          ${precioOriginal}
                        </Typography>
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            fontSize: "20px",
                          }}
                        >
                          (S/
                          {
                            product.sopprod.cod_prod_relation_precios[0]
                              .precio_local
                          }
                          )
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box my={2}>
                    <Typography sx={{ fontWeight: 500 }}>
                      Stock:{" "}
                      {product.sopprod.stock_index > 20
                        ? "+20"
                        : product.sopprod.stock_index}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export function SliderProduct({ products }: { products: Product }) {
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
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
        modules={[Pagination]}
        className="mySwiper"
      >
        {products.results.map((product) => {
          const precioOriginal =
            product.sopprod.cod_prod_relation_precios[0].precio_decimal;
          const precioOferta =
            product.sopprod.cod_prod_relation_precios[0].precio_oferta_d;
          const porcentajeDescuento =
            precioOferta > 0
              ? ((precioOriginal - precioOferta) / precioOriginal) * 100
              : 0;
          return (
            <SwiperSlide key={product.pk}>
              <Link href={`/producto/detalle/${product.slug}`}>
                <Box>
                  <Image
                    src={product.productimage_set[0].images}
                    alt={`Foto del producto ${product.sopprod.nom_prod}`}
                    width={500}
                    height={500}
                    className="rounded-xl"
                  />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{
                        lineHeight: 1,
                        fontWeight: 500,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 3, // 3 lines on small screens, full text on md+
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.sopprod.nom_prod}
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    {precioOferta > 0 ? (
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              textDecoration: "line-through",
                              color: "GrayText",
                              fontSize: "17px",
                              fontWeight: 600,
                            }}
                          >
                            ${precioOriginal} (S/
                            {
                              product.sopprod.cod_prod_relation_precios[0]
                                .precio_local
                            }
                            )
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "green", fontWeight: "bold" }}
                          >
                            {porcentajeDescuento.toFixed(2)}% te ahorras
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "primary.main",
                              fontSize: "20px",
                            }}
                          >
                            ${precioOferta}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "primary.main",
                              fontSize: "20px",
                            }}
                          >
                            (S/
                            {
                              product.sopprod.cod_prod_relation_precios[0]
                                .precio_oferta
                            }
                            )
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            fontSize: "20px",
                          }}
                        >
                          ${precioOriginal}
                        </Typography>
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            fontSize: "20px",
                          }}
                        >
                          (S/
                          {
                            product.sopprod.cod_prod_relation_precios[0]
                              .precio_local
                          }
                          )
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box my={2}>
                    <Typography sx={{ fontWeight: 500 }}>
                      Stock:{" "}
                      {product.sopprod.stock_index > 20
                        ? "+20"
                        : product.sopprod.stock_index}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}