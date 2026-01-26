"use client";

import dynamic from "next/dynamic";
import { Skeleton, Box } from "@mui/material";
import { ProductDetail } from "@/types/products.type";

// Importamos el componente real de forma dinámica
const ProductImageCarousel = dynamic(
  () => import("@/components/product/detail/ProductImageCarousel"),
  {
    // Esto evita que el código del carrusel se ejecute en el servidor (Node.js)
    ssr: false,
    // Mientras se descarga el JS del carrusel, mostramos este esqueleto
    loading: () => (
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "100%",
          aspectRatio: "1/1", // Mantiene la proporción cuadrada mientras carga
          height: { xs: 350, md: 500 },
          borderRadius: "12px"
        }}
      />
    ),
  }
);

interface CarouselWrapperProps {
  product: ProductDetail;
}

export function CarouselWrapper({ product }: CarouselWrapperProps) {
  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <ProductImageCarousel product={product} />
    </Box>
  );
}
