"use client";

import { Box } from "@mui/material";
import { ProformaComponents } from "../ProformaComponents";
import { Proforma } from "@/app/types/proformas.type";

interface Props {
  proformas: Proforma[];
  exchange: number;
}

export function ProformasWithSearch({ exchange, proformas }: Props) {

  return (
    <Box>
      {/* SEARCH */}

      {/* LIST / RESULT */}
      <ProformaComponents proformas={proformas} exchange={exchange} />
    </Box>
  );
}
