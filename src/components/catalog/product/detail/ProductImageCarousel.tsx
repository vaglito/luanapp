"use client";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/zoom";
import { Navigation, Pagination, Thumbs, FreeMode, Zoom } from "swiper/modules";
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ProductDetail } from "@/types/products.type";

export default function ProductImageCarousel({
  product,
}: {
  product: ProductDetail;
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<any>(null);

  const images =
    product.productsimages && product.productsimages.length > 0
      ? product.productsimages
      : [{ images: "/placeholder.png" }];

  const shareViaWhatsApp = useCallback((imageUrl: string) => {
    const text = `${product.relay.productName} — ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }, [product.relay.productName]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
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
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            mb: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Swiper
            onSwiper={setMainSwiper}
            spaceBetween={10}
            slidesPerView={1}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            zoom={isDesktop ? { maxRatio: 3 } : false}
            modules={[FreeMode, Navigation, Thumbs, Zoom]}
            className="mySwiper2"
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} style={{ overflow: "hidden" }}>
                <Box
                  onClick={() => openLightbox(index)}
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    aspectRatio: { xs: "4/3", md: "1/1" },
                    minHeight: { xs: 280, md: 400 },
                    maxHeight: { xs: "60vh", md: 600 },
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    overflow: "hidden",
                    cursor: isDesktop ? "zoom-in" : "pointer",
                    touchAction: "manipulation",
                    "&:hover .swiper-zoom-container": isDesktop
                      ? { transform: "scale(1.5)" }
                      : {},
                  }}
                >
                  <div className="swiper-zoom-container">
                    <Image
                      src={image.images || "/not-found.png"}
                      alt={product.relay.productName}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 600px"
                      style={{ objectFit: "contain", transition: "transform 0.3s ease" }}
                    />
                  </div>
                  {/* Counter badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      borderRadius: "12px",
                      px: 1.5,
                      py: 0.25,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {index + 1} / {images.length}
                  </Box>
                  {/* Zoom icon */}
                  <ZoomInIcon
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "white",
                      opacity: 0,
                      transition: "opacity 0.2s",
                      filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
                      ".mySwiper2 &:hover": { opacity: 1 },
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Thumbs + Share row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: { xs: 64, sm: 80, md: 100 },
            mt: 1,
          }}
        >
          {/* Thumbs Slider */}
          {images.length > 1 && (
            <Box sx={{ flex: 1, height: "100%" }}>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={8}
                slidesPerView={4}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
              >
                {images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    style={{
                      opacity: 0.6,
                      cursor: "pointer",
                      width: `calc((100% - ${8 * 3}px) / 4)`,
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      sx={{
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
                      }}
                    >
                      <Image
                        src={image.images || "/not-found.png"}
                        alt={`Miniatura ${index + 1}`}
                        fill
                        sizes="100px"
                        style={{ objectFit: "contain", padding: "2px" }}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )}

          {/* Share WhatsApp */}
          <IconButton
            onClick={() => shareViaWhatsApp(images[0].images)}
            sx={{
              bgcolor: "#25D366",
              color: "white",
              width: 40,
              height: 40,
              flexShrink: 0,
              "&:hover": { bgcolor: "#1ebe57" },
            }}
            aria-label="Compartir por WhatsApp"
          >
            <WhatsAppIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Lightbox */}
      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: "rgba(0,0,0,0.96)",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <Box sx={{ position: "relative", width: "100%", height: "100vh" }}>
          {/* Close + Counter + Share */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
            }}
          >
            <IconButton onClick={() => setLightboxOpen(false)} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>
              {lightboxIndex + 1} / {images.length}
            </Typography>
            <IconButton
              onClick={() => shareViaWhatsApp(images[lightboxIndex]?.images)}
              sx={{ color: "white" }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Box>

          <Swiper
            initialSlide={lightboxIndex}
            spaceBetween={0}
            navigation={true}
            modules={[Navigation, Zoom]}
            zoom={{ maxRatio: 3 }}
            style={{ width: "100%", height: "100%" }}
            onSlideChange={(s) => setLightboxIndex(s.activeIndex)}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container" style={{ touchAction: "manipulation" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      p: 4,
                    }}
                  >
                    <Image
                      src={image.images || "/not-found.png"}
                      alt={`${product.relay.productName} - Imagen ${index + 1}`}
                      width={1200}
                      height={1200}
                      priority={index === lightboxIndex}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "90vh",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Dialog>
    </>
  );
}