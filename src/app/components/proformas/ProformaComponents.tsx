"use client";

import { useState } from "react";
import { Box, Grid2, useMediaQuery } from "@mui/material";
import { Proforma } from "@/app/types/proformas.type";
import { ProformaCard } from "./proformaslist/ProformaCard";
import { ProformaTable } from "./ProformasTable";
import { ProformaDetailDrawer } from "./ProformaDetailDrawer";

export function ProformaComponents({
  proformas,
  exchange,
}: {
  proformas: Proforma[];
  exchange: number;
}) {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selected, setSelected] = useState<Proforma | null>(null);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
      </Box>
      {isMobile ? (
        <Grid2 container spacing={2}>
          {proformas.map((p) => (
            <Grid2 size={{ xs: 12 }} key={p.id}>
              <ProformaCard proforma={p} onClick={() => setSelected(p)} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <ProformaTable proformas={proformas} onSelect={setSelected} />
      )}

      <ProformaDetailDrawer
        exchange={exchange}
        proforma={selected}
        onClose={() => setSelected(null)}
      />
    </Box>
  );
}
