"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/v2/products-type";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { PriceCard } from "./CardProduct/price-card";

export const CardProduct = ({ product }: {product: Product}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "250px",
        height: "auto",
        borderRadius: 3,
        overflow: "hidden",
        marginY: 5,
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        },
        "&:hover .cart-icon": {
          opacity: 1,
        },
      }}
    >
      
      {/* Contenedor de la imagen */}
      <Box sx={{ position: "relative", width: "100%", height: "250px" }}>
        <Image
          src={product.productimage_set[0].images}
          alt={product.sopprod.nom_prod}
          width={250}
          height={250}
        />

        {/* Icono del carrito al hacer hover */}
        <Tooltip title="Agregar al carrito" placement="top">
        <IconButton
          aria-label="add"
          className="cart-icon"
          color="primary"
          sx={{
            position: "absolute",
            top: "50%",
            right: "8px",
            transform: "translateY(-50%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
        </Tooltip>
      </Box>

      {/* Información del producto */}
      <Link href={`/productos/detalle/${product.slug}`}>
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
            "&:hover": {
              color: "#828282",
            }
          }}
        >
          {product.sopprod.nom_prod.toUpperCase()}
        </Typography>
        <PriceCard price={product.sopprod.cod_prod_relation_precios[0]} />
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
    </Box>
  );
};