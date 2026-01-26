"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Products } from "@/types/products.type";
import { Box, Typography, Button } from "@mui/material";
import { CardImage } from "./CardProduct/card-imagen";
import { CardStock } from "./CardProduct/card-stock";
import { PriceCard } from "./CardProduct/price-card";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { isRestrictedSubcategory } from "@/utils/restricted";



export const CardProduct = ({
  product,
  exchange,
}: {
  product: Products;
  exchange: number;
}) => {
  const isRestricted = isRestrictedSubcategory(
    product.relay.subcategoryCode.subcategoryweb
  );
  const router = useRouter();

  // Use brand name if available
  const brandName = product.relay.classificationCode?.brandName || "";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "background.paper",
        borderRadius: 4,
        border: "1px solid", // Subtle border
        borderColor: "rgba(0,0,0,0.06)",
        overflow: "visible", // Allow hover effects to break bounds if needed, but usually hidden is safer for rounded corners. Let's keep it clean.
        position: "relative",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)",
          borderColor: "transparent",
          zIndex: 2, // Highlight active card
        },
      }}
    >
      {/* 1. Image Section */}
      <Box sx={{ p: 1.5, position: "relative" }}>
        <CardImage product={product} />

        {/* Optional: We can add badge overlay here if needed (e.g. New, Sale) */}
      </Box>

      {/* 2. Content Section */}
      <Link href={`/productos/detalle/${product.slug}`} style={{ textDecoration: 'none', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ px: 2.5, pb: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>

          {/* Brand Name - Subtle Label */}
          <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {brandName && (
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  fontSize: "0.75rem",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  bgcolor: "rgba(89, 20, 163, 0.08)",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                {brandName}
              </Typography>
            )}
            {/* Product Code Small */}
            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem", fontWeight: 500 }}>
              {product.relay.productId}
            </Typography>
          </Box>


          {/* Product Name */}
          <Typography
            variant="subtitle1"
            sx={{
              lineHeight: 1.35,
              fontWeight: 700,
              color: "text.primary",
              fontSize: { xs: "1rem", lg: "1.05rem" },
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              textAlign: "left",
              overflow: "hidden",
              WebkitLineClamp: 2,
              textOverflow: "ellipsis",
              height: "2.7em",
              mb: 1.5,
              transition: "color 0.2s",
              "&:hover": {
                color: "primary.main",
              },
            }}
            title={product.relay.productName}
          >
            {product.relay.productName}
          </Typography>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ my: 1.5, borderTop: "1px dashed rgba(0,0,0,0.1)", width: "100%" }} />

          {/* Price & Stock Row */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Prices */}
            {isRestricted ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  color: "error.main",
                  bgcolor: "#FEF2F2",
                  p: 1.5,
                  borderRadius: 2,
                }}
              >
                <ReportProblemIcon fontSize="small" />
                <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Consultar Precio
                </Typography>
              </Box>
            ) : (
              <Box sx={{ ml: -0.5 }}> {/* Negative margin to align visually left despite padding in price card if any */}
                <PriceCard
                  priceSale={product.relay.priceSale}
                  priceBulk={product.relay.priceBulk}
                  exchange={exchange}
                />
              </Box>
            )}

            {/* Stock Indicator */}
            <CardStock
              stock={product.relay.totalStock}
              cod={''} // We show ID at top now, but keeping prop if needed or empty string
            />
          </Box>

        </Box>
      </Link>

      {/* 3. Action Footer */}
      <Box
        sx={{
          p: 2,
          pt: 0,
        }}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/productos/detalle/${product.slug}`)
          }}
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 50,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.95rem",
            py: 1,
            color: "text.primary",
            borderColor: "rgba(0,0,0,0.12)",
            background: "transparent",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "primary.main",
              color: "white",
              boxShadow: "0 4px 12px rgba(89, 20, 163, 0.25)",
            },
            transition: "all 0.2s ease-in-out"
          }}
        >
          Ver Detalles
        </Button>
      </Box>
    </Box>
  );
};

