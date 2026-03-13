import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid2,
  Skeleton,
} from "@mui/material";

export default function LoadingInvoices() {
  // Generar 6 skeletons para simular tarjetas de facturas
  const skeletons = Array.from({ length: 6 });

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Mis Facturas
      </Typography>

      <Grid2 container spacing={3}>
        {skeletons.map((_, index) => (
          <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                {/* Header Skeleton */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Skeleton width={120} height={20} />
                    <Skeleton width={150} height={28} sx={{ mt: 0.5 }} />
                  </Box>
                  <Skeleton variant="rounded" width={80} height={32} />
                </Box>

                {/* Body Details Skeleton */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    mb: 3,
                  }}
                >
                  <Skeleton width={180} />
                  <Skeleton width={140} />
                </Box>

                {/* Actions Skeleton */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    pt: 2,
                  }}
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
