import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";

export default function ProformasLoading() {
  return (
    <Box>
      {/* Header skeleton */}
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="text" width={320} height={24} sx={{ mt: 0.5 }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {/* Create Proforma card skeleton */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Skeleton
            variant="rounded"
            height={300}
            sx={{ borderRadius: 2 }}
          />
        </Box>

        {/* List skeleton */}
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <Skeleton
            variant="rounded"
            height={400}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </Box>

      {/* Loading indicator */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <CircularProgress size={24} />
        <Typography variant="body2" color="text.secondary">
          Cargando proformas...
        </Typography>
      </Box>
    </Box>
  );
}
