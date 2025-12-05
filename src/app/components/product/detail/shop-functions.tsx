"use client";
import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { showToast } from "nextjs-toast-notify"; // 🔹 importamos toast

export function ShopFunction({
  title,
  stock,
  subCategory,
}: {
  title: string;
  stock: number;
  subCategory: string;
}) {
  const [counter, setCounter] = useState(1);

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

  // 🔹 Validación de subcategorías directamente aquí
  const restrictedSubcategories =
    process.env.NEXT_PUBLIC_RESTRICTED_SUBCATEGORIES?.split(",") || [];
  const isRestricted = restrictedSubcategories.includes(subCategory);

  // Arreglo de números para seleccionar aleatoriamente
  const numbers = [51919443359, 51922481325, 981355117];

  const addProduct = () => {
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

    // Seleccionar aleatoriamente un número del array
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

    // Mensaje que se enviará
    const message = `Hola, quiero comprar ${counter} unidad(es) del producto.\n${title}`;

    // Construir URL para WhatsApp
    const whatsappUrl = `https://wa.me/${randomNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank");

    showToast.success("✅ Redirigiendo a WhatsApp para completar la compra", {
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
      <Box sx={{ display: "flex", alignItems: "center" }}>{content}</Box>
      <Box sx={{ maxWidth: 350, marginTop: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button
            onClick={decrement}
            variant="contained"
            disabled={counter <= 1}
            sx={{
              backgroundColor: "#ff6b6b",
              color: "white",
              "&:hover": { backgroundColor: "#ff5252" },
            }}
          >
            -
          </Button>

          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              padding: "0 20px",
              textAlign: "center",
            }}
          >
            {counter}
          </Typography>

          <Button
            onClick={increment}
            variant="contained"
            disabled={counter >= stock}
            sx={{
              backgroundColor: "#1e90ff",
              color: "white",
              "&:hover": { backgroundColor: "#1c7ed6" },
            }}
          >
            +
          </Button>
        </Box>

        <Button
          onClick={addProduct}
          variant="contained"
          fullWidth
          startIcon={<WhatsAppIcon />}
          sx={{
            backgroundColor: "#38d9a9",
            color: "white",
            "&:hover": { backgroundColor: "#20c997" },
          }}
        >
          Comprar por WhatsApp
        </Button>
      </Box>
    </Box>
  );
}