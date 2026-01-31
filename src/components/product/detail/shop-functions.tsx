"use client"
import { useState } from "react";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // 🔹 Importar icono de carrito
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { showToast } from "nextjs-toast-notify";
import { useCart } from "@/hooks/use-cart"; // 🔹 Importar hook del carrito
import { ProductDetail } from "@/types/products.type"; // 🔹 Importar tipo ProductDetail
import { SELLERS } from "@/config/sellers";

export function ShopFunction({
  title,
  stock,
  subCategory,
  product, // 🔹 Recibir el objeto producto completo
}: {
  title: string;
  stock: number;
  subCategory: string;
  product: ProductDetail;
}) {
  const [counter, setCounter] = useState(1);
  const { addItem } = useCart(); // 🔹 Obtener la función addItem

  const increment = () => {
    if (counter < stock) {
      setCounter(counter + 1);
    }
  };

  const decrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const restrictedSubcategories =
    process.env.NEXT_PUBLIC_RESTRICTED_SUBCATEGORIES?.split(",") || [];
  const isRestricted = restrictedSubcategories.includes(subCategory);



  const addProductToCart = () => { // 🔹 Nueva función para agregar al carrito
    if (isRestricted) {
      showToast.error("❌ Este producto solo se vende en computadoras completas");
      return;
    }
    if (stock === 0) {
      showToast.error("❌ No hay stock disponible");
      return;
    }

    // Adaptar ProductDetail a Products si es necesario, o asegurar que tipos sean compatibles
    // @ts-ignore: ProductDetail es compatible con Products para el carrito en este contexto
    addItem(product, counter);
  };

  const addProductWhatsApp = () => {
    if (isRestricted) {
      showToast.error("❌ Este producto solo se vende en computadoras completas", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    if (stock === 0) {
      showToast.error("❌ No hay stock disponible", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    // Seleccionar vendedor al azar
    const randomSeller = SELLERS[Math.floor(Math.random() * SELLERS.length)];
    const message = `Hola, quiero comprar ${counter} unidad(es) del producto.\n${title}`;
    const whatsappUrl = `https://wa.me/${randomSeller.phone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    showToast.success(`✅ Contactando con ${randomSeller.name}`, {
      duration: 3000,
      position: "top-right",
    });
  };


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
    <Box sx={{ marginTop: 4 }}>
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
          <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #E0E0E0", borderRadius: 2 }}>
            <Button
              onClick={decrement}
              disabled={counter <= 1}
              sx={{
                minWidth: 40,
                color: "#545454",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": { bgcolor: "#F5F5F5" },
              }}
            >
              -
            </Button>

            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                padding: "0 15px",
                textAlign: "center",
                color: "#333"
              }}
            >
              {counter}
            </Typography>

            <Button
              onClick={increment}
              disabled={counter >= stock}
              sx={{
                minWidth: 40,
                color: "#5914A3",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": { bgcolor: "#F5F5F5" },
              }}
            >
              +
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
          <Button
            onClick={addProductToCart}
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            disabled={stock === 0 || isRestricted}
            sx={{
              flex: 1,
              backgroundColor: "#5914A3", // Primary
              color: "white",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 14px 0 rgba(89, 20, 163, 0.39)",
              "&:hover": { backgroundColor: "#450b82", boxShadow: "0 6px 20px 0 rgba(89, 20, 163, 0.23)" },
            }}
          >
            Agregar al Carrito
          </Button>

          <Button
            onClick={addProductWhatsApp}
            variant="outlined"
            startIcon={<WhatsAppIcon />}
            disabled={stock === 0 || isRestricted}
            sx={{
              flex: 1,
              borderColor: "#25D366",
              color: "#25D366",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                borderColor: "#1ebe57",
                backgroundColor: "rgba(37, 211, 102, 0.08)",
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
