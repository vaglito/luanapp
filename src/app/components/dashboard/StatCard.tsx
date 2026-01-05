import { Card, CardContent, Typography } from "@mui/material";

export function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h5" fontWeight={700}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
