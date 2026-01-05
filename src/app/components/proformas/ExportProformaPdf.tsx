"use client";

import { Button, Box } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Proforma } from "@/app/types/proformas.type";
import { generateProformaPDF } from "@/app/utils/seller-pdf-proforma";
import { generateProformaPDFUSD } from "@/app/utils/seller-pdf-proformausd";

interface Props {
  proforma: Proforma;
  exchange: number;
}

export function ExportProformaPDFButton({ proforma, exchange }: Props) {
  return (
    <Box sx={{ display: "flex", gap: 4}}>
      <Button
        size="small"
        variant="outlined"
        color="error"
        startIcon={<PictureAsPdfIcon />}
        onClick={() => generateProformaPDF({ proforma, exchange })}
      >
        Generar en SOLES (S/)
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="error"
        startIcon={<PictureAsPdfIcon />}
        onClick={() => generateProformaPDFUSD(proforma)}
      >
        Generar en USD ($)
      </Button>
    </Box>
  );
}
