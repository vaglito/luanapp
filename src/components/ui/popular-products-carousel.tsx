"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Box, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Products } from "@/types/products.type";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CardProduct } from "@/components/product/card-product";

interface PopularProductsCarouselProps {
    products: Products[];
    exchange: number;
    startRank: number;
}

export const PopularProductsCarousel = ({
    products,
    exchange,
    startRank
}: PopularProductsCarouselProps) => {
    return (
        <Box sx={{ position: "relative", mx: -2, px: 2 }}> {/* Negative margin to allow buttons to sit outside container if needed, or just standard */}

            {/* Navigation Buttons */}
            <IconButton
                className="popular-prev"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%)",
                    bgcolor: "white",
                    zIndex: 20,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    width: 40,
                    height: 40,
                    border: "1px solid rgba(0,0,0,0.05)",
                    "&:hover": { bgcolor: "white", transform: "translateY(-50%) scale(1.1)" },
                    display: { xs: "none", md: "flex" }
                }}
            >
                <ArrowBackIosNewIcon fontSize="small" sx={{ color: "#333" }} />
            </IconButton>

            <IconButton
                className="popular-next"
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                    bgcolor: "white",
                    zIndex: 20,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    width: 40,
                    height: 40,
                    border: "1px solid rgba(0,0,0,0.05)",
                    "&:hover": { bgcolor: "white", transform: "translateY(-50%) scale(1.1)" },
                    display: { xs: "none", md: "flex" }
                }}
            >
                <ArrowForwardIosIcon fontSize="small" sx={{ color: "#333" }} />
            </IconButton>

            <Swiper
                modules={[Navigation, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
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
                    1200: { slidesPerView: 4, spaceBetween: 24 },
                }}
                style={{ padding: "20px 4px" }} // Padding for shadows and rank badges
            >
                {products.map((product, index) => {
                    const rank = startRank + index;
                    // Rank Colors
                    const badgeColor = rank === 2 ? "#E0E0E0" : rank === 3 ? "#CD7F32" : "#212121";
                    const textColor = rank === 2 || rank === 3 ? "#333" : "white";

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
                                        bgcolor: badgeColor,
                                        color: textColor,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 10,
                                        fontWeight: 800,
                                        fontFamily: "var(--font-orbitron)",
                                        fontSize: "1rem",
                                        border: "3px solid white",
                                        boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
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
