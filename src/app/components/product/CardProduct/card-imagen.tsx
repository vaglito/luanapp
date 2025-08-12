import Image from "next/image";
import Link from "next/link";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";

interface CardImageProps {
  title: string;
  slug: string;
  productimage_set: {
    images: string;
  }[];
}

export function CardImage({ title, productimage_set, slug }: CardImageProps) {
  const [hover, setHover] = useState(false);
  const hasSecondImage = productimage_set.length > 1;

  return (
    <Link
      href={`/productos/detalle/${slug}`} // Ajusta la ruta según tu estructura
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          cursor: "pointer",
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
          }}
        >
          <Image
            src={productimage_set[0]?.images}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
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
              src={productimage_set[1]?.images}
              alt={title}
              fill
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
              e.preventDefault(); // Evita que el click del carrito siga el link
              console.log("Añadir al carrito");
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Link>
  );
}
