import Image from "next/image";
import Link from "next/link";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Products } from "@/types/products.type";
import { showToast } from "nextjs-toast-notify";
import { isRestrictedSubcategory } from "@/utils/restricted";



interface CardImageProps {
  product: Products;
}

export function CardImage({ product }: CardImageProps) {
  const [hover, setHover] = useState(false);
  const hasSecondImage = product.productsimages.length > 1;
  const { addItem } = useCart();

  const isRestricted = isRestrictedSubcategory(
    product.relay.subcategoryCode.subcategoryweb
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRestricted) {
      showToast.error("❌ No se puede agregar este producto", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    addItem(product, 1);
  };

  return (
    <Link
      href={`/productos/detalle/${product.slug}`}
      style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%", // Fill height
          // Remove strict aspect ratio here to let it fill the 260px container
          // aspectRatio: "1 / 1", 
          overflow: "hidden",
          cursor: "pointer",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Imagen principal */}
        <Box
          sx={{
            position: "relative", // Changed from absolute to relative/static if we want it to sizing naturally? No, stick to fill pattern.
            width: "100%",
            height: "100%",
            transition: hasSecondImage ? "opacity 0.5s ease" : "none",
            opacity: hasSecondImage && hover ? 0 : 1,
            borderRadius: 0,
          }}
        >
          <Image
            src={product.productsimages[0]?.images || "/not-found.png"}
            alt={product.relay.productName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain", borderRadius: 0 }}
          />
        </Box>

        {/* Imagen secundaria */}
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
              src={product.productsimages[1]?.images || "/not-found.png"}
              alt={product.relay.productName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
            />
          </Box>
        )}

        {/* Botón de carrito */}
        <Tooltip title="Agregar al carrito" placement="left">
          <IconButton
            aria-label="add to cart"
            sx={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              bgcolor: "white",
              color: "primary.main",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transform: hover ? "scale(1) translateY(0)" : "scale(0.8) translateY(10px)",
              opacity: hover ? 1 : 0,
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
                boxShadow: "0 8px 16px rgba(89, 20, 163, 0.3)",
                transform: "scale(1.1)",
              },
              width: 44,
              height: 44,
            }}
            onClick={handleAddToCart}
          >
            <AddShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Link>
  );
}

