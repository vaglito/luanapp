import { Container, Box, Typography } from "@mui/material";
import { Computer } from "./computer";

const data = [
  {
    id: 3,
    title: "PRODUCTIVIDAD",
    state: true,
    description:
      "Equipo diseñado para ofrecer un equilibrio óptimo entre rendimiento, eficiencia y estabilidad en entornos laborales.",
    image:
      "https://luanatech.pe/media/typecomputer/PRODUCTIVIDAD/PRODUCTIVIDAD.png",
    slug: "productividad",
    created_at: "2025-07-30T16:30:12.815290-05:00",
    updated_at: "2025-07-31T19:01:31.658393-05:00",
  },
  {
    id: 2,
    title: "GAMER",
    state: true,
    description:
      "Equipos orientados a jugadores exigentes que buscan alto rendimiento en juegos AAA actuales con excelente calidad gráfica.",
    image: "https://luanatech.pe/media/typecomputer/GAMER/GAMER.png",
    slug: "gamer",
    created_at: "2025-07-30T14:49:02.166233-05:00",
    updated_at: "2025-07-31T19:01:23.429172-05:00",
  },
  {
    id: 1,
    title: "OFICINA",
    state: true,
    description:
      "Equipos perfectos para estudiantes, oficinas o personas que requieren un equipo accesible y funcional para el día a día.",
    image: "https://luanatech.pe/media/typecomputer/OFICINA/OFICINA.png",
    slug: "oficina",
    created_at: "2025-07-17T18:14:10.986397-05:00",
    updated_at: "2025-07-31T19:01:15.163127-05:00",
  },
];

export function ComputerHome() {
  return (
    <Box bgcolor="white" sx={{ marginY: 5}}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" color="#545454" sx={{ fontWeight: "bold" }}>
              Computadoras
            </Typography>
            <Box>
              <Typography color="#545454" sx={{
                fontSize: 18
              }}>
                Encuentra configuraciones acorde a tu preferencia y trabajo.
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Body */}
        <Box sx={{ marginY: 4}}>
          <Computer data={data} />
        </Box>
      </Container>
    </Box>
  );
}
