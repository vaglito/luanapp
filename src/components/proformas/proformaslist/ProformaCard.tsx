"use client";

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { Proforma } from "@/types/proformas.type";

interface Props {
  proforma: Proforma;
  onClick: () => void;
}

export function ProformaCard({ proforma, onClick }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{ cursor: "pointer", ":hover": { boxShadow: 3 } }}
      onClick={onClick}
    >
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={700}>{proforma.code}</Typography>
            <Chip label={proforma.mode} size="small" />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {proforma.customer}
          </Typography>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Total</Typography>
            <Typography fontWeight={600}>S/ {proforma.total}</Typography>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            {new Date(proforma.createdAt).toLocaleString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

