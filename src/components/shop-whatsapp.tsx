"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export function ShopWhatsApp({ title, slug }: { title: string, slug: string }) {
  const pathname = usePathname();
  const [fullUrl, setFullUrl] = useState("");

  // useEffect se ejecuta solo en el cliente, evitando el error "window is not defined"
  useEffect(() => {
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      // Si el pathname ya termina en el slug (en el detalle), no lo repetimos
      const currentPath = pathname.endsWith(slug) ? pathname : `${pathname}/${slug}`;
      setFullUrl(`${protocol}//${hostname}${currentPath}`);
    }
  }, [pathname, slug]);

  const addProduct = () => {
    // Aseguramos que los números tengan el código de país 51
    const numbers = ["51919443359", "51922481325", "51981355117"];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

    const message = `¡Hola! 👋 Estoy interesado en la computadora: *${title}*.\n\nVer aquí: ${fullUrl}`;

    const whatsappUrl = `https://wa.me/${randomNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Button
        onClick={addProduct}
        variant="contained"
        fullWidth
        startIcon={<WhatsAppIcon />}
        sx={{
          py: 1.5,
          borderRadius: 3,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: "bold",
          backgroundColor: "#25D366", // Color oficial de WhatsApp
          boxShadow: "0 4px 14px 0 rgba(37, 211, 102, 0.39)",
          "&:hover": {
            backgroundColor: "#1ebe57",
            boxShadow: "0 6px 20px rgba(37, 211, 102, 0.23)",
          },
        }}
      >
        Pedir por WhatsApp
      </Button>
    </Box>
  );
}