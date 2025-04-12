"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Typography, Box, IconButton, Tooltip } from "@mui/material";
import { Product } from "@/app/types/v2/products-type";
import { PriceLaptop } from "./price-laptop";

export const CardLaptop = ({ product }: { product: Product }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // 🔥 asegura consistencia interna
        position: "relative",
        width: "100%",
        maxWidth: "250px",
        height: "100%", // 🔥 importante para igualar en un contenedor padre con grid/flex
        borderRadius: 3,
        overflow: "hidden",
        marginY: 3,
        bgcolor: "#fff",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Imagen */}
      <Link
        href={`/productos/detalle/${product.slug}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box sx={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
          <Image
            src={product.productimage_set[0].images}
            alt={product.sopprod.nom_prod}
            fill
            sizes="(max-width: 768px) 100vw, 250px"
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* Info producto */}
        <Box
          sx={{
            p: 1,
            minHeight: 130, // 🔥 misma altura para todos los textos
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.2,
              fontWeight: 600,
              fontSize: { xs: "0.85rem", sm: "1rem" },
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 3, // 🔥 reduce a 2 líneas máximo
              textOverflow: "ellipsis",
            }}
          >
            {product.sopprod.nom_prod}
          </Typography>

          <PriceLaptop price={product.sopprod.cod_prod_relation_precios[0]} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 0.5,
              fontSize: "0.85rem",
            }}
          >
            <Typography>Stock: {product.sopprod.stock_index}</Typography>
            <Typography>Código: {product.sopprod.pk}</Typography>
          </Box>
        </Box>
      </Link>

      {/* Acciones */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 1,
          gap: 3,
        }}
      >
        <Tooltip title="Agregar al carrito" placement="top">
          <IconButton
            aria-label="add"
            color="primary"
            sx={{
              opacity: { xs: 1, md: hover ? 1 : 0 },
              transition: "opacity 0.3s ease",
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Comprar por WhatsApp" placement="top">
          <IconButton
            aria-label="shopping"
            color="primary"
            sx={{
              opacity: { xs: 1, md: hover ? 1 : 0 },
              transition: "opacity 0.3s ease",
            }}
          >
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
