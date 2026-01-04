import { Skeleton, Grid2 } from "@mui/material";

export default function Loading() {
  return (
    <Grid2 container spacing={3}>
      {[1, 2, 3].map((i) => (
        <Grid2 key={i} size={{ xs: 12, md: 4 }}>
          <Skeleton height={120} variant="rounded" />
        </Grid2>
      ))}
    </Grid2>
  );
}