import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Typography, Paper, Chip, Stack, Divider } from "@mui/material";
import { Computer } from "@/app/types/computer.type";
import { ShopWhatsApp } from "../shop-whatsapp";
import BoltIcon from "@mui/icons-material/Bolt";
import { convertUsdToPen } from "@/app/lib/currency";

export function ComputerCard({
  computer,
  exchange,
}: {
  computer: Computer;
  exchange: number;
}) {
  const pathname = usePathname();
  const pricePen = convertUsdToPen(computer.totalPrice, exchange);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 4,
        marginY: 4,
        border: "1px solid #f0f0f0",
        transition: "all 0.3s ease",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "&:hover": {
          boxShadow: "0px 10px 20px rgba(0,0,0,0.08)",
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* Contenedor de Imagen con Link */}
      <Link
        href={`${pathname}/${computer.slug}`}
        style={{ textDecoration: "none" }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            bgcolor: "#f9f9f9",
            aspectRatio: "1 / 1",
            "& img": {
              transition: "transform 0.5s ease-in-out",
            },
            "&:hover img": {
              transform: "scale(1.08)",
            },
          }}
        >
          <Image
            src={computer.image || "/not-found.png"}
            alt={computer.title}
            fill
            sizes="(max-width: 500px) 100vw, (max-width: 500px) 50vw, 33vw"
          />
          {/* Badge de disponibilidad opcional */}
          <Chip
            label="Disponible"
            size="small"
            color="success"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: "bold",
              fontSize: "0.7rem",
            }}
          />
        </Box>

        <Box sx={{ p: 2, flexGrow: 1 }}>
          {/* Título con límite de líneas */}
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: 15, md: 17 },
              color: "#1a1a1a",
              fontWeight: 800,
              textAlign: "left",
              lineHeight: 1.2,
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "2.8rem", // Mantiene la altura constante entre cards
            }}
          >
            {computer.title}
          </Typography>

          {/* Especificaciones Técnicas Estilizadas */}
          <Stack spacing={0.5} sx={{ mb: 2 }}>
            {Object.entries(computer.specifications)
              .slice(0, 4)
              .map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "#f0f4f8",
                    borderRadius: 1.5,
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <BoltIcon sx={{ fontSize: 14, color: "primary.main" }} />
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "text.secondary",
                    }}
                  >
                    <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
                    {value as string}
                  </Typography>
                </Box>
              ))}
          </Stack>
        </Box>
      </Link>

      {/* Acciones y Precio */}
      <Box sx={{ px: 2, pb: 2, mt: "auto" }}>
        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block" }}
            >
              Precio Online
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 900, color: "#A3147F", lineHeight: 1 }}
            >
              S/{pricePen} - (${computer.totalPrice})
            </Typography>
          </Box>
          {/* Aquí podrías poner el precio en Soles si lo tienes */}
        </Box>

        <ShopWhatsApp title={computer.title} slug={computer.slug} />
      </Box>
    </Paper>
  );
}
