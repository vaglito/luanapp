"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
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
        position: "relative",
        width: "100%",
        height: "auto",
        borderRadius: 3,
        overflow: "hidden",
        marginY: 5,
        bgcolor: "#fff",
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Contenedor de la imagen */}
      <Link href={`/productos/detalle/${product.slug}`}>
        <Box>
          <Image
            src={product.productimage_set[0].images}
            alt={product.sopprod.nom_prod}
            width={500}
            height={500}
          />
        </Box>
        <Box sx={{ p: 1 }}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1,
              fontWeight: 600,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 3,
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
              mt: 1,
            }}
          >
            <Typography>Stock: {product.sopprod.stock_index}</Typography>
            <Typography>Codigo: {product.sopprod.pk}</Typography>
          </Box>
        </Box>
      </Link>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 1,
          gap: 5,
        }}
      >
        <Tooltip title="Agregar al carrito" placement="top">
        <IconButton
          aria-label="add"
          color="primary"
          sx={{
            position: "relative",
            opacity: hover ? 1 : 0,
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
            position: "relative",
            opacity: hover ? 1 : 0,
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
