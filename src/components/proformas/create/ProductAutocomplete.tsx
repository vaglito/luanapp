"use client";

import { useState } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

import { useProductSearch } from "@/hooks/useSearchProduct";
import { Products } from "@/types/products.type";
import { CreateProformaItem } from "@/types/proforma-create.type";

interface Props {
  onSelect: (item: CreateProformaItem) => void;
}

export function ProductAutocomplete({ onSelect }: Props) {
  const [input, setInput] = useState("");
  const [value, setValue] = useState<Products | null>(null);
  const { results, loading } = useProductSearch(input);
  console.log(input)

  const handleSelect = (_: any, product: Products | null) => {
    if (!product) return;

    onSelect({
      productId: product.id,
      internalCode: product.relay.productId,
      productName: product.relay.productName,
      unitPrice: product.relay.priceSale,
      quantity: 1,
      total: product.relay.priceSale,
    });
    setValue(null);
    setInput("");
  };

  return (
    <Autocomplete
      options={results}
      // 1. Agregamos una validación para evitar que intente leer propiedades de undefined
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        return option?.relay
          ? `${option.relay.productId} - ${option.relay.productName}`
          : "";
      }}
      // 2. Aseguramos que el componente sepa cómo comparar objetos
      isOptionEqualToValue={(o, v) =>
        o.relay?.productId === v.relay?.productId
      }
      loading={loading}
      onChange={handleSelect}
      value={value}
      inputValue={input}
      onInputChange={(_, value) => setInput(value)}
      noOptionsText="No se encontraron productos"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar producto"
          placeholder="Código o nombre"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
            },
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={18} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box component="li" key={key} {...optionProps}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight={600}>
                {option.relay?.productName || "Sin nombre"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {option.relay?.productId || "Sin ID"}
              </Typography>
            </Box>
            <Typography fontWeight={700}>
              $ {option.relay?.priceSale?.toFixed(2) || "0.00"}
            </Typography>
          </Box>
        );
      }}
    />
  );
}

