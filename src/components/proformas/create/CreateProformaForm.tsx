"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";

import { useCreateProforma } from "@/hooks/useCreateProforma";
import { CustomerSection } from "./CustomerSection";
import { ProformaItemRow } from "./ProformaItemRow";
import { ProformaSummary } from "./ProformaSummary";
import { CreateProformaPayload } from "@/types/proforma-create.type";
import { ProductAutocomplete } from "./ProductAutocomplete";

export function CreateProformaForm() {
  const {
    items,
    addItem,
    updateItem,
    removeItem,
    subtotal,
    createProforma,
    resetProforma,
  } = useCreateProforma();
  const router = useRouter();
  const [autoKey, setAutoKey] = useState(0); // 👈 CLAVE
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProformaPayload>({
    defaultValues: {
      mode: "CONTADO",
    },
  });

  const onSubmit = async (data: CreateProformaPayload) => {
    const payload = {
      ...data,
      items,
    };

    await createProforma(payload);
    reset();
    resetProforma()
    setAutoKey((k) => k + 1); // 🔥 fuerza remount
    router.refresh();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <CustomerSection register={register} errors={errors} />

        <Stack spacing={1}>
          {items.map((item, i) => (
            <ProformaItemRow
              key={i}
              item={item}
              index={i}
              onUpdate={updateItem}
              onRemove={removeItem}
            />
          ))}
        </Stack>
        <ProductAutocomplete
          onSelect={(item) => {
            const existingIndex = items.findIndex(
              (i) => i.productId === item.productId
            );

            if (existingIndex >= 0) {
              updateItem(existingIndex, items[existingIndex].quantity + 1);
            } else {
              addItem(item);
            }
          }}
        />

        <ProformaSummary subtotal={subtotal} />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!items.length}
        >
          Crear Proforma
        </Button>
      </Stack>
    </Box>
  );
}

