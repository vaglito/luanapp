"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import { Proforma } from "@/types/proformas.type";

interface Props {
  proformas: Proforma[];
  onSelect: (p: Proforma) => void;
}

export function ProformaTable({ proformas, onSelect }: Props) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Modo</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {proformas.map((p) => (
            <TableRow
              key={p.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => onSelect(p)}
            >
              <TableCell>{p.code}</TableCell>
              <TableCell>{p.customer}</TableCell>
              <TableCell>$ {p.total}</TableCell>
              <TableCell>{p.mode}</TableCell>
              <TableCell>
                {new Date(p.createdAt).toLocaleDateString("es-PE", { timeZone: "America/Lima" })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

