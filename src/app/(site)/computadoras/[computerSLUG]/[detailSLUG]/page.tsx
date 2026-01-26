import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  Divider,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Grid2,
} from "@mui/material";
import { fetchComputerDetail } from "@/services/computer";
import { ShopWhatsApp } from "@/components/shop-whatsapp";
import { fetchExchangeRate } from "@/services/exchangeRate";
import { convertUsdToPen } from "@/lib/currency";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PaymentsIcon from "@mui/icons-material/Payments";

interface ComputerDetailPageProps {
  params: Promise<{
    detailSLUG: string;
  }>;
}

export default async function ComputerDetailPage({
  params,
}: ComputerDetailPageProps) {
  const { detailSLUG } = await params;
  const computer = await fetchComputerDetail(detailSLUG);
  const exchange = await fetchExchangeRate();

  if (!computer) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5">
          La computadora solicitada no está disponible.
        </Typography>
      </Container>
    );
  }

  const priceSalePen = convertUsdToPen(computer.totalPrice, exchange.exchange);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid2 container spacing={4}>
        {/* COLUMNA IZQUIERDA: Galería de Imagen */}
        <Grid2 size={{ xs: 12, lg: 7 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              position: "sticky",
              top: 20,
              bgcolor: "white",
              border: "1px solid #f0f0f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Image
              src={computer.image || "/not-found.png"}
              alt={computer.title}
              width={700}
              height={700}
              priority
              style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }}
            />
          </Paper>
        </Grid2>

        {/* COLUMNA DERECHA: Información de Compra */}
        <Grid2 size={{ xs: 12, lg: 5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2 }}
            >
              {computer.title}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                icon={<VerifiedUserIcon />}
                label="Garantía Luana"
                color="success"
                variant="outlined"
                size="small"
              />
              <Chip label="Nuevo" size="small" />
            </Stack>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", mb: 2 }}
            >
              {computer.description}
            </Typography>

            {/* BOX DE PRECIO */}
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "#fafafa",
                border: "1px dashed #A3147F",
              }}
            >
              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography
                  sx={{ fontSize: 42, fontWeight: 900, color: "#A3147F" }}
                >
                  S/{priceSalePen}
                </Typography>
                <Typography
                  sx={{ fontSize: 20, color: "gray", fontWeight: 500 }}
                >
                  (${computer.totalPrice.toFixed(2)})
                </Typography>
              </Stack>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                *Precio incluye IGV. Tipo de cambio referencial: S/
                {exchange.exchange}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Stack spacing={1}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PaymentsIcon sx={{ color: "#2e7d32", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Dscto. Transferencia / Efectivo
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalShippingIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                  <Typography variant="body2">Envío a todo el Perú</Typography>
                </Box>
              </Stack>
            </Paper>

            {/* CHIPS DE SPECS RÁPIDAS */}
            <Grid2 container spacing={1}>
              {Object.entries(computer.specifications).map(([key, value]) => (
                <Grid2 size={{ xs: 6 }} key={key}>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: "#f4f4f4",
                      borderRadius: 2,
                      textAlign: "center",
                      border: "1px solid #eee",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        display: "block",
                        color: "gray",
                      }}
                    >
                      {key}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {value as string}
                    </Typography>
                  </Box>
                </Grid2>
              ))}
            </Grid2>

            <Box sx={{ mt: 2 }}>
              <ShopWhatsApp title={computer.title} slug={computer.slug} />
            </Box>
          </Box>
        </Grid2>
      </Grid2>

      {/* SECCIÓN INFERIOR: FICHA TÉCNICA DETALLADA */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Ficha Técnica de Componentes
        </Typography>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ borderRadius: 3 }}
        >
          <Table>
            <TableBody>
              {computer.computers.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:nth-of-type(odd)": { bgcolor: "#fafafa" } }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      width: "30%",
                      color: "primary.main",
                    }}
                  >
                    Componente {index + 1}
                  </TableCell>
                  <TableCell>cant. {item.quantity}</TableCell>
                  <TableCell>{item.product.relay.productName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
