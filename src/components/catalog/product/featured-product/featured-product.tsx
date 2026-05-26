"use client";
import { Box, alpha } from "@mui/material";
import Link from "next/link";
import { Products } from "@/types/products.type";
import { getPrice } from "@/utils/price-product";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { MyButton } from "@/components/ui/Buttons/Buttons";
import { MyChip } from "@/components/ui/Chip/MyChip";
import { TypographyWrapper } from "@/components/ui/Typography/Typography";

interface FeaturedProductProps {
  product: Products;
  exchange: number;
}

export const FeaturedProduct = ({
  product,
  exchange,
}: FeaturedProductProps) => {
  const price = getPrice(product, exchange);
  const slug = `/productos/detalle/${product.slug}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        minHeight: { xs: "auto", md: "400px" },
        backgroundColor: alpha("#fff", 0.8),
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "24px",
        border: `1px solid ${alpha("#FFD700", 0.4)}`, // Borde dorado más fino y elegante
        boxShadow: `0 20px 40px -15px ${alpha("#FFD700", 0.15)}`,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 30px 60px -12px ${alpha("#FFD700", 0.25)}`,
          "& .product-image": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      {/* #1 Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 10,
        }}
      >
        <MyChip
          customVariant="warning" // Cambiado a dorado
          icon={<EmojiEventsIcon />}
          label="#1 MÁS BUSCADO"
        />
      </Box>

      {/* 1. Image Section (Left/Top) */}
      <Box
        sx={{
          flex: { xs: "0 0 200px", md: "0 0 45%" },
          p: { xs: 2, md: 4 },
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "transparent",
        }}
      >
        {/* Abstract Bg */}
        <Box
          sx={{
            position: "absolute",
            width: "80%",
            height: "80%",
            background: `radial-gradient(circle, ${alpha("#FFD700", 0.2)} 0%, transparent 70%)`,
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <Box
          className="product-image"
          component="img"
          src={
            product.productsimages[0]
              ? product.productsimages[0].images
              : "/img/placeholder.png"
          }
          alt={product.relay.productName}
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "auto",
            maxHeight: { xs: "180px", md: "300px" },
            objectFit: "contain",
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))",
          }}
        />
      </Box>

      {/* 2. Content Section (Right/Bottom) */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3, md: 5 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderLeft: { md: `1px solid ${alpha("#000", 0.05)}` },
        }}
      >
        <Box sx={{ mb: 1 }}>
          <TypographyWrapper 
            customVariant="tag" 
            sx={{ 
              bgcolor: alpha("#5914A3", 0.1), 
              color: "primary.main",
              border: `1px solid ${alpha("#5914A3", 0.1)}`
            }}
          >
            SKU: {product.relay.productId}
          </TypographyWrapper>
        </Box>
        
        <Link href={slug} style={{ textDecoration: "none" }}>
          <TypographyWrapper 
            customVariant="subtitle" 
            component="h3"
            sx={{ 
              fontSize: { xs: "1.5rem", md: "2.2rem" },
              transition: "color 0.2s",
              "&:hover": { color: "primary.main" }
            }}
          >
            {product.relay.productName}
          </TypographyWrapper>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {/* Price & Action Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "flex-start", lg: "flex-end" },
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box>
            {price.discount > 0 && (
              <TypographyWrapper
                variant="h6"
                sx={{
                  textDecoration: "line-through",
                  color: "text.disabled",
                  lineHeight: 1,
                }}
              >
                S/ {price.priceb}
              </TypographyWrapper>
            )}
            <TypographyWrapper
              customVariant="hero"
              color="primary"
              variant="h2"
              sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
            >
              S/ {price.price}
            </TypographyWrapper>
          </Box>

          <Link href={slug}>
            <MyButton
              fullWidth
              customVariant="details"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                height: 56, 
                px: 4, 
                fontSize: "1.1rem",
                borderRadius: "12px" 
              }}
            >
              Lo Quiero
            </MyButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
