import Image from "next/image";
import { Box } from "@mui/material";
import { useState } from "react";
import { Products } from "@/types/products.type";



interface CardImageProps {
  product: Products;
}

export function CardImage({ product }: CardImageProps) {
  const [hover, setHover] = useState(false);
  const hasSecondImage = product.productsimages.length > 1;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        overflow: "hidden",
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
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMGYwZjAiIC8+PC9zdmc+"
            style={{ objectFit: "cover", borderRadius: 0 }}
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
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMGYwZjAiIC8+PC9zdmc+"
              style={{ objectFit: "contain" }}
            />
          </Box>
        )}

      </Box>
  );
}

