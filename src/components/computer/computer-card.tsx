import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Typography, Paper, Chip, Stack, Divider } from "@mui/material";
import { Computer } from "@/types/computer.type";
import { ShopWhatsApp } from "../shop-whatsapp";
import BoltIcon from "@mui/icons-material/Bolt";
import { convertUsdToPen } from "@/lib/currency";

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
        borderRadius: 3,
        marginY: 2,
        bgcolor: "white",
        border: "1px solid #e5e7eb",
        transition: "box-shadow 0.3s ease-in-out",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: "0px 0px 20px rgb(203, 182, 214)",
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* Contenedor de Imagen con Link */}
      <Link
        href={`${pathname}/${computer.slug}`}
        style={{ textDecoration: "none", flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            bgcolor: "#f8fafc",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            "& img": {
              transition: "transform 0.5s ease-in-out",
            },
            "&:hover img": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Image
            src={computer.image || "/not-found.png"}
            alt={computer.title}
            fill
            style={{ objectFit: "contain", padding: "12px" }}
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
          />
          {/* Badge de disponibilidad */}
          <Chip
            label="DISPONIBLE"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: 700,
              fontSize: "0.7rem",
              bgcolor: "#22c55e",
              color: "white",
            }}
          />
        </Box>

        <Box sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Título */}
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: 16, md: 17 },
              color: "#545454",
              fontWeight: 700,
              lineHeight: 1.3,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "2.6em",
            }}
          >
            {computer.title}
          </Typography>

          {/* Especificaciones Técnicas */}
          <Stack spacing={0.8} sx={{ mb: 2, flexGrow: 1 }}>
            {Object.entries(computer.specifications)
              .slice(0, 4)
              .map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "#f1f5f9",
                    borderRadius: 1.5,
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <BoltIcon sx={{ fontSize: 16, color: "#A3147F" }} />
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "#64748b",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ fontWeight: 600, color: "#475569", textTransform: "capitalize" }}>
                      {key}:
                    </span>{" "}
                    {value as string}
                  </Typography>
                </Box>
              ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Precio */}
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="caption"
              sx={{ display: "block", color: "#64748b", mb: 0.5 }}
            >
              Precio Online
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                color: "#A3147F",
                fontSize: "1.4rem",
                lineHeight: 1,
              }}
            >
              S/{pricePen}
              <Typography component="span" sx={{ fontSize: "0.9rem", color: "#94a3b8", ml: 1, fontWeight: 400 }}>
                (${computer.totalPrice})
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Link>

      {/* Botón de Acción */}
      <Box sx={{ px: 2.5, pb: 2.5 }}>
        <ShopWhatsApp title={computer.title} slug={computer.slug} />
      </Box>
    </Paper>
  );
}

