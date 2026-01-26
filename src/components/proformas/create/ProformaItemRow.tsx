import {
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CreateProformaItem } from "@/types/proforma-create.type";

interface Props {
  item: CreateProformaItem;
  index: number;
  onUpdate: (index: number, qty: number) => void;
  onRemove: (index: number) => void;
}

export function ProformaItemRow({
  item,
  index,
  onUpdate,
  onRemove,
}: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr auto",
        gap: 1,
        alignItems: "center",
      }}
    >
      <Typography>{item.productName}</Typography>

      <TextField
        type="number"
        size="small"
        value={item.quantity}
        onChange={(e) =>
          onUpdate(index, Number(e.target.value))
        }
      />

      <Typography>$ {item.total.toFixed(2)}</Typography>

      <IconButton onClick={() => onRemove(index)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

