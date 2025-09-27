"use client";
import { usePathname } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export function ShopWhatsApp({ title, slug }: { title: string, slug: string }) {
  const router = usePathname();
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const urlFull = `${protocol}//${hostname}${router}/${slug}`

  const numbers = [51919443359, 51922481325, 981355117];
  const addProduct = () => {
    // Seleccionar aleatoriamente un número del array
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

    // Mensaje que se enviará
    const message = `Hola, quiero comprar 1 unidad de la computadora.\n${urlFull}`;

    // Construir URL para WhatsApp
    const whatsappUrl = `https://wa.me/${randomNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Abrir WhatsApp

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={addProduct}
        variant="contained"
        startIcon={<WhatsAppIcon />}
        sx={{
          backgroundColor: "#38d9a9",
          color: "white",
          "&:hover": {
            backgroundColor: "#20c997",
          },
        }}
      >
        Comprar por WhatsApp
      </Button>
    </Box>
  );
}
