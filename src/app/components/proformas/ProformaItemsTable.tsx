import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ProformaItem } from "@/app/types/proformas.type";

export function ProformaItemsTable({ items }: { items: ProformaItem[] }) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Producto</TableCell>
          <TableCell>Cant.</TableCell>
          <TableCell>Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((i) => (
          <TableRow key={i.id}>
            <TableCell>{i.productName}</TableCell>
            <TableCell>{i.quantity}</TableCell>
            <TableCell>S/ {i.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
