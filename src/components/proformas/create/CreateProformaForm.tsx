"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Use MUI icon
import { showToast } from "nextjs-toast-notify";

import { useCreateProforma } from "@/hooks/useCreateProforma";
import { CustomerSection } from "./CustomerSection";
import { ProformaItemRow } from "./ProformaItemRow";
import { ProformaSummary } from "./ProformaSummary";
import { CreateProformaPayload } from "@/types/proforma-create.type";
import { ProductAutocomplete } from "./ProductAutocomplete";
import { useCart } from "@/hooks/use-cart";

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

  const { items: cartItems } = useCart();

  const router = useRouter();
  const [autoKey, setAutoKey] = useState(0); // 👈 CLAVE

  // Logic to import items from cart
  const handleImportFromCart = () => {
    if (cartItems.length === 0) {
      showToast.info("El carrito está vacío");
      return;
    }

    cartItems.forEach((cartItem) => {
      const existingIndex = items.findIndex(
        (i) => i.productId === cartItem.id
      );

      if (existingIndex >= 0) {
        // If exists, add quantity
        updateItem(existingIndex, items[existingIndex].quantity + cartItem.quantity);
      } else {
        // If not, add new item
        addItem({
          productId: cartItem.id,
          internalCode: cartItem.relay.productId,
          productName: cartItem.relay.productName,
          unitPrice: cartItem.relay.priceSale,
          quantity: cartItem.quantity,
          total: cartItem.relay.priceSale * cartItem.quantity,
        });
      }
    });

    showToast.success("Productos importados del carrito");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProformaPayload>({
    defaultValues: {
      mode: "CONTADO",
      customer: "Cliente",
      customerDocument: "12345678",
      customerEmail: "cliente@corporacionluana.pe",
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

        {/* Button to import from cart */}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            startIcon={<ShoppingCartIcon sx={{ fontSize: 18 }} />}
            onClick={handleImportFromCart}
            disabled={cartItems.length === 0}
          >
            Traer del Carrito ({cartItems.length})
          </Button>
        </Box>

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

