"use client"
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { ProductDetail } from "@/types/products.type";

import { useProductActions } from "@/hooks/use-product-actions";

export function ShopFunction({
  title,
  stock,
  subCategory,
  product,
}: {
  title: string;
  stock: number;
  subCategory: string;
  product: ProductDetail;
}) {
  const {
    counter,
    isRestricted,
    increment,
    decrement,
    addToCart,
    contactWhatsApp,
  } = useProductActions({
    product,
    stock,
    subCategory,
    title,
  });


  let content;

  if (stock > 20) {
    content = (
      <>
        <CheckCircleIcon sx={{ color: "success.main", marginRight: 1 }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 17, sm: 18, md: 19, lg: 20 },
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          Disponibilidad: +20 unidades
        </Typography>
      </>
    );
  } else if (stock > 0 && stock <= 5) {
    content = (
      <>
        <ErrorIcon sx={{ color: "warning.main", marginRight: 1 }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 17, sm: 18, md: 19, lg: 20 },
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            color: "warning.main",
          }}
        >
          ¡Quedan solo {stock} unidades disponibles!
        </Typography>
      </>
    );
  } else if (stock === 0) {
    content = (
      <>
        <CancelIcon sx={{ color: "error.main", marginRight: 1 }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 17, sm: 18, md: 19, lg: 20 },
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            color: "error.main",
          }}
        >
          Producto no disponible
        </Typography>
      </>
    );
  } else {
    content = (
      <>
        <CheckCircleIcon sx={{ color: "success.main", marginRight: 1 }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 17, sm: 18, md: 19, lg: 20 },
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          Disponibilidad: {stock} unidades
        </Typography>
      </>
    );
  }

  return (
    <Box sx={{ marginTop: 2 }}>
      {/* Badges */}
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Chip
          icon={<AutoAwesomeIcon />}
          label="Nuevo"
          size="small"
          variant="outlined"
          color="primary"
        />
        <Chip
          icon={<VerifiedUserIcon />}
          label="Garantía Luana"
          color="success"
          variant="outlined"
          size="small"
        />
      </Stack>

      <Box sx={{ display: "flex", alignItems: "center" }}>{content}</Box>
      <Box sx={{ width: "100%", marginTop: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mb: 3,
            gap: 2
          }}
        >
          <Typography sx={{ fontWeight: 600, color: "#545454" }}>Cantidad:</Typography>
          <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #E0E0E0", borderRadius: "12px", overflow: "hidden" }}>
            <Button
              onClick={decrement}
              disabled={counter <= 1}
              sx={{
                minWidth: 45,
                height: 45,
                color: "text.secondary",
                fontWeight: "bold",
                fontSize: "1.2rem",
                borderRadius: 0,
                "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
              }}
            >
              -
            </Button>

            <Typography
              sx={{
                fontSize: "1.1rem",
                fontFamily: "var(--font-orbitron)",
                fontWeight: "bold",
                minWidth: 40,
                textAlign: "center",
                color: "text.primary"
              }}
            >
              {counter}
            </Typography>

            <Button
              onClick={increment}
              disabled={counter >= stock}
              sx={{
                minWidth: 45,
                height: 45,
                color: "primary.main",
                fontWeight: "bold",
                fontSize: "1.2rem",
                borderRadius: 0,
                "&:hover": { bgcolor: "rgba(89, 20, 163, 0.1)" },
              }}
            >
              +
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
          <Button
            onClick={addToCart}
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            disabled={stock === 0 || isRestricted}
            sx={{
              flex: 1,
              backgroundColor: "primary.main",
              color: "white",
              fontWeight: 700,
              fontFamily: "var(--font-orbitron)", // Tech Font
              py: 1.5,
              borderRadius: "12px",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              letterSpacing: "0.05em",
              boxShadow: "0 4px 14px 0 rgba(89, 20, 163, 0.39)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "primary.dark",
                boxShadow: "0 0 20px rgba(89, 20, 163, 0.6)", // Purple Glow
                transform: "translateY(-2px)",
              },
            }}
          >
            Agregar al Carrito
          </Button>

          <Button
            onClick={contactWhatsApp}
            variant="outlined"
            startIcon={<WhatsAppIcon />}
            disabled={stock === 0 || isRestricted}
            sx={{
              flex: 1,
              borderColor: "#25D366",
              color: "#25D366",
              fontWeight: 700,
              fontFamily: "var(--font-orbitron)", // Tech Font
              py: 1.5,
              borderRadius: "12px",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              letterSpacing: "0.05em",
              "&:hover": {
                borderColor: "#1ebe57",
                backgroundColor: "rgba(37, 211, 102, 0.1)",
                boxShadow: "0 0 15px rgba(37, 211, 102, 0.4)", // Green Glow
              },
            }}
          >
            Cotizar por WhatsApp
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
