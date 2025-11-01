import Image from "next/image";
import Link from "next/link";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import { useCart } from "@/app/hooks/use-cart";
import { Products } from "@/app/types/products.type";

interface CardImageProps {
  product: Products;
}

export function CardImage({ product }: CardImageProps) {
  const [hover, setHover] = useState(false);
  const hasSecondImage = product.productsimages.length > 1;
  const { addItem } = useCart();
  return (
    <Link
      href={`/productos/detalle/${product.slug}`} // Ajusta la ruta según tu estructura
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          cursor: "pointer",
          borderRadius: 3,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Imagen principal */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            transition: hasSecondImage ? "opacity 0.5s ease" : "none",
            opacity: hasSecondImage && hover ? 0 : 1,
            borderRadius: 3,
          }}
        >
          <Image
            src={product.productsimages[0]?.images}
            alt={product.relay.productName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover", borderRadius: 3 }}
          />
        </Box>

        {/* Imagen secundaria (solo si existe) */}
        {hasSecondImage && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              transition: "opacity 0.5s ease",
              opacity: hover ? 1 : 0,
            }}
          >
            <Image
              src={product.productsimages[1]?.images}
              alt={product.relay.productName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        )}

        {/* Icono del carrito */}
        <Tooltip title="Agregar al carrito" placement="top">
          <IconButton
            aria-label="add"
            color="primary"
            sx={{
              position: "absolute",
              top: "50%",
              right: "8px",
              transform: "translateY(-50%)",
              opacity: hover ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
            onClick={(e) => {
              e.preventDefault();
              addItem(product, 1);
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Link>
  );
}
