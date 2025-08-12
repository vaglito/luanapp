"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/app/types/v2/products-type";
import { Box, Typography, Button } from "@mui/material";
import { CardImage } from "./CardProduct/card-imagen";
import { CardStock } from "./CardProduct/card-stock";

import { PriceCard } from "./CardProduct/price-card";

export const CardProduct = ({ product }: { product: Product }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        borderRadius: 3,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 0px 20px rgb(203, 182, 214)",
        },
        "&:hover .cart-icon": {
          opacity: 1,
        },
      }}
    >
      {/* Contenedor de la imagen */}
      <CardImage
        productimage_set={product.productimage_set}
        title={product.sopprod.nom_prod}
        slug={product.slug}
      />

      {/* Información del producto */}
      <Link href={`/productos/detalle/${product.slug}`}>
        <Box sx={{ p: 1 }}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.2,
              fontWeight: 600,
              color: "#545454",
              fontSize: { xs: "0.85rem", sm: "1rem" },
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              textAlign: "justify",
              overflow: "hidden",
              WebkitLineClamp: 3,
              textOverflow: "ellipsis",
              transition: "color 0.2s",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {product.sopprod.nom_prod}
          </Typography>
          <PriceCard price={product.sopprod.cod_prod_relation_precios[0]} />
          <CardStock
            stock={product.sopprod.stock_index}
            cod={product.sopprod.pk}
          />
        </Box>
      </Link>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 2,
          alignItems: "end",
        }}
      >
        <Button
          onClick={() => router.push(`/productos/detalle/${product.slug}`)}
          variant="outlined"
          sx={{ borderRadius: 5, width: "70%", textTransform: "capitalize" }}
        >
          Ver más
        </Button>
      </Box>
    </Box>
  );
};
