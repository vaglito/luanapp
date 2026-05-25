"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Products } from "@/types/products.type";
import { Box, Typography, Chip } from "@mui/material";
/* Compoenets */
import { MyButton } from "@/components/ui/Buttons/Buttons";
import { CardImage } from "./card-imagen";
import { CardStock } from "./card-stock";
import { PriceCard } from "./price-card";
import { isRestrictedSubcategory } from "@/utils/restricted";
/* Icon */
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export const CardProduct = ({
  product,
  exchange,
}: {
  product: Products;
  exchange: number;
}) => {
  const isRestricted = isRestrictedSubcategory(
    product.relay.subcategoryCode.subcategoryweb,
  );
  const router = useRouter();

  // Cálculo de descuento para el badge
  const hasDiscount = !isRestricted && product.relay.priceBulk > 0 && product.relay.priceBulk < product.relay.priceSale;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.relay.priceSale - product.relay.priceBulk) / product.relay.priceSale) * 100) 
    : 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        // Glassmorphism Card Style
        backgroundColor: "background.paper",
        borderRadius: "16px",
        border: "1px solid",
        borderColor: "divider",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 24px rgba(89, 20, 163, 0.12)",
          borderColor: "primary.light",
        },
      }}
    >
      {/* Badge de Descuento */}
      {hasDiscount && (
        <Chip
          label={`-${discountPercentage}%`}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 10,
            bgcolor: "error.main",
            color: "white",
            fontWeight: 800,
            fontSize: "0.75rem",
            borderRadius: "6px",
            height: 24,
            boxShadow: "0 2px 8px rgba(211, 47, 47, 0.4)",
            pointerEvents: "none"
          }}
        />
      )}

      {/* 1. Image Section */}
      <Box
        sx={{
          p: 0,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "transparent",
          borderBottom: "none",
        }}
      >
        <CardImage product={product} />
      </Box>

      {/* 2. Content Section */}
      <Link
        href={`/productos/detalle/${product.slug}`}
        style={{
          textDecoration: "none",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Product Name */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--font-inter)", // Override orbitron for better readability on long titles
              lineHeight: 1.4,
              fontWeight: 600,
              color: "text.primary",
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
              height: { xs: "2.6em", sm: "2.8em" }, // Fixed height for alignment
              mb: 2,
              transition: "color 0.2s",
              "&:hover": { color: "primary.main" },
            }}
            title={product.relay.productName}
          >
            {product.relay.productName}
          </Typography>

          {/* Price & Stock */}
          <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
            {isRestricted ? (
              <Chip
                icon={<ReportProblemIcon fontSize="small" />}
                label="Consultar Precio"
                color="error"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            ) : (
              <PriceCard
                priceSale={product.relay.priceSale}
                priceBulk={product.relay.priceBulk}
                exchange={exchange}
              />
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CardStock
                stock={product.relay.totalStock}
                cod={product.relay.productId}
              />
            </Box>
          </Box>
        </Box>
      </Link>

      {/* 3. Action Button (Animated) */}
      <Box sx={{ px: { xs: 2, sm: 2.5 }, pb: { xs: 2, sm: 2.5 }, pt: 0 }}>
        <MyButton
          fullWidth
          customVariant="submit"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/productos/detalle/${product.slug}`);
          }}
          startIcon={<VisibilityOutlinedIcon />}
          sx={{ 
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none"
          }}
        >
          Ver Detalle
        </MyButton>
      </Box>
    </Box>
  );
};
