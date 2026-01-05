"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateProforma } from "@/app/hooks/useCreateProforma";
import { CustomerSection } from "./CustomerSection";
import { ProformaItemRow } from "./ProformaItemRow";
import { ProformaSummary } from "./ProformaSummary";
import { CreateProformaPayload } from "@/app/types/proforma-create.type";
import { ProductAutocomplete } from "./ProductAutocomplete";

export function CreateProformaForm() {
  const { items, addItem, updateItem, removeItem, subtotal, createProforma, loading } =
    useCreateProforma();
  const router = useRouter();
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

    await createProforma(payload)
    router.refresh()
    reset()
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
