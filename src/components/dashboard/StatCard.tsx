import { Card, CardContent, Chip, Tooltip, Typography } from "@mui/material";

export function StatCard({
  title,
  value,
  placeholder = false,
}: {
  title: string;
  value?: string;
  placeholder?: boolean;
}) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        {placeholder ? (
          <Tooltip title="Estadísticas en desarrollo" arrow>
            <Chip
              label="Próximamente"
              color="default"
              sx={{ mt: 0.5, fontWeight: 500 }}
            />
          </Tooltip>
        ) : (
          <Typography variant="h5" fontWeight={700}>
            {value}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
