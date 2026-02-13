import { Box, Typography } from "@mui/material";
import { ProductPrice } from "@/components/product/detail/product-price";
import { ShopFunction } from "./shop-functions";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { isRestrictedSubcategory } from "@/utils/restricted";
import { ProductDetail } from "@/types/products.type"; // 🔹 Importamos el tipo

interface ProductDetailDescriptionProps {
  title: string;
  resumen: string;
  stock: number;
  prices: number;
  priceb: number;
  exchange: number;
  subCategories: string;
  product: ProductDetail; // 🔹 Nueva prop
}

export function ProductDetailDescription({
  title,
  resumen,
  prices,
  priceb,
  stock,
  exchange,
  subCategories,
  product, // 🔹 Recibir prop
}: ProductDetailDescriptionProps) {
  const isRestricted = isRestrictedSubcategory(subCategories);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.95)", // Glassmorphism
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        borderRadius: "16px",
        paddingY: 4,
        paddingX: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontFamily: "var(--font-inter)", // Changed to Inter per user request
            fontWeight: 700, // Extra bold for title impact
            fontSize: { xs: 22, sm: 26, md: 28, lg: 28 },
            color: "text.primary",
            textAlign: "justify",
            mb: 1, // Reduced margin
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* BUY BOX AREA - High Priority */}
      <Box sx={{ mb: 3 }}>
        {isRestricted ? (
          <Typography
            sx={{
              color: "error.main",
              fontWeight: 600,
              fontSize: { xs: 18 },
              mt: 1,
            }}
          >
            <ReportProblemIcon /> Precio no disponible
          </Typography>
        ) : (
          <ProductPrice prices={prices} priceb={priceb} exchange={exchange} />
        )}

        <ShopFunction
          title={title}
          stock={stock}
          subCategory={subCategories}
          product={product}
        />
      </Box>

      {/* DESCRIPTION AREA - Secondary Priority */}
      <Box
        sx={{
          marginTop: 2,
          paddingTop: 2,
          borderTop: "1px solid rgba(0,0,0,0.05)",
          fontSize: { xs: 15, sm: 16, md: 16, lg: 16 },
          fontFamily: "var(--font-inter)",
          color: "text.secondary",
          textAlign: "justify",
          lineHeight: 1.6,
          "& p": { mb: 1.5 },
        }}
      >
        <Typography variant="h6" sx={{ fontFamily: "var(--font-orbitron)", mb: 1, fontSize: "1.1rem" }}>
          Resumen
        </Typography>
        <Box dangerouslySetInnerHTML={{ __html: resumen }} />
      </Box>
    </Box>
  );
}

