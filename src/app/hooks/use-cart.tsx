import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { showToast } from "nextjs-toast-notify";

import { Products } from "../types/products.type";

interface CartItem extends Products {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Products, quantity?: number) => void;
  updatedItemQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (data: Products, quantity = 1) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === data.id);

        if (existingItems) {
          const newQuantity = existingItems.quantity + quantity;
          if (newQuantity > data.relay.totalStock) {
            showToast.error("No puedes agregar más que el stock disponible.");
          }
          const updatedItems = currentItems.map((item) =>
            item.id === data.id ? { ...item, quantity: newQuantity } : item
          );
          set({ items: updatedItems });
          showToast.success("Cantidad actualizada en el carrito.");
        } else {
          if (quantity > data.relay.totalStock) {
            showToast.error("No puedes agregar más que el stock disponible.");
          }

          set({ items: [...currentItems, { ...data, quantity }] });
          showToast.success("Producto añadido correctamente.");
        }
      },
      updatedItemQuantity: (id, quantity) => {
        const currentItems = get().items;
        const item = currentItems.find((item) => item.id === id);
        if (!item) return;

        if (quantity > item.relay.totalStock) {
          showToast.error("No puedes exceder el stock disponible.");
        }

        if (quantity < 1) {
          showToast.info("La cantidad mínima es 1.");
        }

        const updatedItems = currentItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id != id)] });
        showToast.success("Producto eliminado correctamente.");
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
