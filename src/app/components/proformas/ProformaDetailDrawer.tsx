"use client";

import {
  Drawer,
  Box,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { Proforma } from "@/app/types/proformas.type";
import { ProformaItemsTable } from "./ProformaItemsTable";

interface Props {
  proforma: Proforma | null;
  onClose: () => void;
}

export function ProformaDetailDrawer({ proforma, onClose }: Props) {
  return (
    <Drawer anchor="right" open={!!proforma} onClose={onClose}>
      {proforma && (
        <Box sx={{ width: 380, p: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            {proforma.code}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {proforma.customer}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <ProformaItemsTable items={proforma.items} />

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography>Total</Typography>
            <Typography fontWeight={700}>
              S/ {proforma.total}
            </Typography>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}
