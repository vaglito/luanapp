import { Box, Grid2, Paper, Typography, Divider } from "@mui/material";
import { ProformasWithSearch } from "@/app/components/proformas/proformaslist/ProformaSearch";
import { CreateProformaForm } from "@/app/components/proformas/create/CreateProformaForm";
import { fetchExchangeRate } from "@/app/services/exchangeRate";
import { getProformas } from "@/app/services/dashboard/seller/proformas";

export const dynamic = "force-dynamic";

export default async function SellerDashboard() {
  const exchange = await fetchExchangeRate();
  const proformas = await getProformas()

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Proformas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Crea y administra proformas de manera rápida y ordenada
        </Typography>
      </Box>

      <Grid2 container spacing={3}>
        {/* Crear Proforma */}
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Nueva proforma
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <CreateProformaForm />
          </Paper>
        </Grid2>

        {/* Listado */}
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Proformas recientes
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <ProformasWithSearch
              proformas={proformas.results}
              exchange={exchange.exchange}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}
